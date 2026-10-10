import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  /**
   * إضافة تقييم ومراجعة لطلب مكتمل
   */
  async createReview(reviewerId: string, dto: CreateReviewDto) {
    // 1. جلب الطلب والتحقق من حالته
    const [order] = await this.db.query(
      `SELECT id, client_id, driver_id, status FROM orders WHERE id = $1`,
      [dto.order_id],
    );

    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }

    if (order.status !== 'delivered') {
      throw new BadRequestException('لا يمكن تقييم طلب لم يكتمل تسليمه بعد');
    }

    // 2. التحقق من هوية المقيم (يجب أن يكون العميل أو السائق لهذا الطلب تحديداً)
    let revieweeId: string;
    if (reviewerId === order.client_id) {
      revieweeId = order.driver_id;
    } else if (reviewerId === order.driver_id) {
      revieweeId = order.client_id;
    } else {
      throw new ForbiddenException('ليس لديك صلاحية تقييم هذا الطلب');
    }

    // 3. منع التقييم المكرر
    const [existing] = await this.db.query(
      `SELECT id FROM reviews WHERE order_id = $1 AND reviewer_id = $2`,
      [dto.order_id, reviewerId],
    );

    if (existing) {
      throw new ConflictException('لقد قمت بتقييم هذا الطلب مسبقاً');
    }

    const queryRunner = this.db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 4. إدراج التقييم
      const [review] = await queryRunner.query(
        `INSERT INTO reviews (order_id, reviewer_id, reviewee_id, rating, comment)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [dto.order_id, reviewerId, revieweeId, dto.rating, dto.comment ?? null],
      );

      // 5. إذا كان المقيم عميلاً والمقيّم سائق، نعيد حساب المعدل الإجمالي للسائق
      if (reviewerId === order.client_id) {
        const [avgResult] = await queryRunner.query(
          `SELECT ROUND(AVG(rating), 2) AS avg_rating, COUNT(id) AS total_count
           FROM reviews 
           WHERE reviewee_id = $1`,
          [revieweeId],
        );

        await queryRunner.query(
          `UPDATE drivers 
           SET current_rating = $1 
           WHERE user_id = $2`,
          [avgResult.avg_rating, revieweeId],
        );
      }

      await queryRunner.commitTransaction();
      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * جلب تقييمات مستخدم معين (سائق أو عميل)
   */
  async getUserReviews(userId: string) {
    return this.db.query(
      `SELECT r.id, r.rating, r.comment, r.created_at, u.name AS reviewer_name
       FROM reviews r
       JOIN users u ON u.id = r.reviewer_id
       WHERE r.reviewee_id = $1
       ORDER BY r.created_at DESC
       LIMIT 30`,
      [userId],
    );
  }
}
