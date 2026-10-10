import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDriverAdminDto {
  @ApiProperty({ example: 'أمين بوعلام', description: 'الاسم الكامل للسائق' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '0555123456', description: 'رقم هاتف السائق' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: '123456', description: 'كلمة المرور' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '16-12345-00', description: 'رقم لوحة ترقيم الدراجة' })
  @IsString()
  @IsNotEmpty()
  vehicle_plate: string;

  @ApiPropertyOptional({ example: 'driver@mmo.dz', description: 'البريد الإلكتروني' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 36.7538, description: 'خط العرض (Latitude)' })
  @IsNumber()
  @IsOptional()
  @Min(-90)
  @Max(90)
  lat?: number;

  @ApiPropertyOptional({ example: 3.0588, description: 'خط الطول (Longitude)' })
  @IsNumber()
  @IsOptional()
  @Min(-180)
  @Max(180)
  lng?: number;

  @ApiPropertyOptional({ example: true, description: 'هل هو معتمد وموثق فوراً؟' })
  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;
}
