import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Reviews')
@ApiBearerAuth('JWT-auth')
@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'تقييم طلب مكتمل (1 إلى 5 نجوم مع تعليق)' })
  @Post()
  createReview(@Req() req: any, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(req.user.sub, dto);
  }

  @ApiOperation({ summary: 'عرض مراجعات وتقييمات مستخدم معين' })
  @Get('user/:id')
  getUserReviews(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.getUserReviews(id);
  }
}
