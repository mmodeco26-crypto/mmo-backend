import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DriversService } from './drivers.service';

@ApiTags('Drivers')
@ApiBearerAuth('JWT-auth')
@Controller('drivers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @ApiOperation({ summary: 'الملف الشخصي للسائق مع الإحصائيات (خاص بالسائق)' })
  @Get('profile')
  @Roles('driver')
  getProfile(@Req() req: any) {
    return this.driversService.getDriverProfile(req.user.sub);
  }

  @ApiOperation({ summary: 'سجل الطلبات السابقة للسائق' })
  @Get('orders')
  @Roles('driver')
  getOrders(@Req() req: any) {
    return this.driversService.getDriverOrders(req.user.sub);
  }

  @ApiOperation({ summary: 'تحديث موقع السائق الجغرافي GPS (يُستدعى كل 5-10 ثوانٍ)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        lat: { type: 'number', example: 36.752887, description: 'خط العرض (-90 إلى 90)' },
        lng: { type: 'number', example: 3.042048, description: 'خط الطول (-180 إلى 180)' },
      },
      required: ['lat', 'lng'],
    },
  })
  @Patch('location')
  @Roles('driver')
  updateLocation(
    @Req() req: any,
    @Body() body: { lat: number; lng: number },
  ) {
    return this.driversService.updateLocation(req.user.sub, body.lat, body.lng);
  }

  @ApiOperation({ summary: 'تغيير حالة الاتصال (متصل / غير متصل)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        is_online: { type: 'boolean', example: true, description: 'true: جاهز لاستقبال الطلبات، false: غير متاح' },
      },
      required: ['is_online'],
    },
  })
  @Patch('status')
  @Roles('driver')
  toggleStatus(
    @Req() req: any,
    @Body() body: { is_online: boolean },
  ) {
    return this.driversService.toggleOnlineStatus(req.user.sub, body.is_online);
  }
}
