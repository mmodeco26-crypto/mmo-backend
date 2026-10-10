import {
  Body, Controller, Get, Param, ParseUUIDPipe,
  Patch, Post, Query, Req, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'إنشاء طلب توصيل جديد (خاص بالعملاء)',
    description: 'يقوم الـ Backend بحساب المسافة بصيغة Haversine وتحديد السعر تلقائياً دون الاعتماد على العميل.',
  })
  @ApiResponse({ status: 201, description: 'تم إنشاء الطلب بنجاح وتم إشعار السائقين القريبين' })
  @Post()
  @Roles('client')
  createOrder(@Req() req: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.sub, dto);
  }

  @ApiOperation({ summary: 'سجل الطلبات الحالية والسابقة للعميل' })
  @Get('my-orders')
  @Roles('client')
  getMyOrders(@Req() req: any) {
    return this.ordersService.getClientOrders(req.user.sub);
  }

  @ApiOperation({
    summary: 'جلب الطلبات المعلقة القريبة من السائق (خاص بالسائقين)',
    description: 'يستخدم PostGIS ST_DWithin وفهرس GIST Spatial Index للبحث السريع ضمن نصف قطر محدد.',
  })
  @ApiQuery({ name: 'radius', required: false, example: 5, description: 'نصف القطر بالكيلومتر (الافتراضي: 5 كم)' })
  @Get('nearby')
  @Roles('driver')
  getNearbyOrders(
    @Req() req: any,
    @Query('radius') radius = '5',
  ) {
    return this.ordersService.getNearbyOrders(req.user.sub, +radius);
  }

  @ApiOperation({
    summary: 'قبول طلب التوصيل (خاص بالسائقين)',
    description: 'محمي ضد Concurrency و Race Condition عبر استخدام Database Lock (SELECT FOR UPDATE SKIP LOCKED).',
  })
  @ApiResponse({ status: 200, description: 'تم قبول الطلب بنجاح' })
  @ApiResponse({ status: 409, description: 'الطلب قيد المعالجة أو تم قبوله من سائق آخر' })
  @Patch(':id/accept')
  @Roles('driver')
  acceptOrder(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ordersService.acceptOrder(req.user.sub, id);
  }

  @ApiOperation({ summary: 'تحديث حالة الطلب أثناء دورة التوصيل' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['picked_up', 'in_transit', 'delivered', 'cancelled'],
          example: 'picked_up',
        },
      },
      required: ['status'],
    },
  })
  @Patch(':id/status')
  @Roles('driver')
  updateStatus(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: 'picked_up' | 'in_transit' | 'delivered' | 'cancelled',
  ) {
    return this.ordersService.updateOrderStatus(req.user.sub, id, status);
  }
}
