import { Body, Controller, Get, HttpCode, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'تسجيل حساب جديد (عميل أو سائق)' })
  @ApiResponse({ status: 201, description: 'تم إنشاء الحساب بنجاح وإرجاع الـ token' })
  @ApiResponse({ status: 409, description: 'رقم الهاتف مسجل مسبقاً' })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'تسجيل الدخول والحصول على JWT Token' })
  @ApiResponse({ status: 200, description: 'تم تسجيل الدخول بنجاح' })
  @ApiResponse({ status: 401, description: 'بيانات الدخول غير صحيحة أو الحساب معطل' })
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'تحديث رمز إشعارات Firebase (FCM Token)' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { fcm_token: { type: 'string', example: 'fcm_new_token_string' } },
      required: ['fcm_token'],
    },
  })
  @Patch('fcm-token')
  @UseGuards(JwtAuthGuard)
  updateFcmToken(
    @Req() req: any,
    @Body('fcm_token') fcmToken: string,
  ) {
    return this.authService.updateFcmToken(req.user.sub, fcmToken);
  }

  @ApiOperation({ summary: 'جلب السائقين الحقيقيين المسجلين في المنصة لاختيارهم في المحاكي' })
  @Get('simulator/drivers')
  getSimulatorDrivers() {
    return this.authService.getSimulatorDrivers();
  }

  @ApiOperation({ summary: 'توليد توكن حقيقي لسائق تم اختياره للتجربة في المحاكي' })
  @Post('simulator/driver-token')
  getSimulatorDriverToken(@Body('driver_id') driverId: string) {
    return this.authService.getSimulatorDriverToken(driverId);
  }

  @ApiOperation({ summary: 'توليد توكن حقيقي لزبون لطلب التوصيل في المحاكي' })
  @Post('simulator/client-token')
  getSimulatorClientToken() {
    return this.authService.getSimulatorClientToken();
  }

  @ApiOperation({ summary: 'جلب إعدادات تسعيرة المنصة المعتمدة' })
  @Get('pricing-settings')
  getPricingSettings() {
    return this.authService.getPricingSettings();
  }
}
