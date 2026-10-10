import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { OtpService } from './otp.service';

@ApiTags('Authentication - OTP')
@Controller('auth/otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'إرسال رمز تحقق SMS لرقم الهاتف' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { phone: { type: 'string', example: '01012345678' } },
      required: ['phone'],
    },
  })
  @Post('send')
  @HttpCode(200)
  sendOtp(@Body('phone') phone: string) {
    return this.otpService.sendOtp(phone);
  }

  @ApiOperation({ summary: 'التحقق من صحة كود OTP' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string', example: '01012345678' },
        code: { type: 'string', example: '123456' },
      },
      required: ['phone', 'code'],
    },
  })
  @Post('verify')
  @HttpCode(200)
  async verifyOtp(
    @Body('phone') phone: string,
    @Body('code') code: string,
  ) {
    const valid = await this.otpService.verifyOtp(phone, code);
    return { verified: valid, message: 'تم التحقق من رقم الهاتف بنجاح' };
  }
}
