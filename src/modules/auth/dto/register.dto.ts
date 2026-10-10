import {
  IsEmail, IsEnum, IsOptional, IsString, MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UserRole {
  ADMIN  = 'admin',
  CLIENT = 'client',
  DRIVER = 'driver',
}

export class RegisterDto {
  @ApiProperty({ example: 'أحمد محمد', description: 'الاسم الكامل للمستخدم' })
  @IsString()
  name: string;

  @ApiProperty({ example: '01012345678', description: 'رقم الهاتف الفريد' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: 'client@example.com', description: 'البريد الإلكتروني (اختياري)' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'ClientPass@123', description: 'كلمة المرور (8 محارف كحد أدنى)' })
  @IsString()
  @MinLength(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' })
  password: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.CLIENT, description: 'دور المستخدم: client أو driver' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: 'د ب ب 1234', description: 'رقم لوحة المركبة (مطلوب إذا كان الدور driver)' })
  @IsString()
  @IsOptional()
  vehicle_plate?: string;

  @ApiPropertyOptional({ example: 'fcm_token_sample_string', description: 'رمز إشعارات Firebase FCM' })
  @IsString()
  @IsOptional()
  fcm_token?: string;
}
