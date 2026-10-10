import {
  IsNotEmpty, IsNumber, IsOptional, IsString,
  Max, Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'البريد المركزي، الجزائر العاصمة', description: 'عنوان استلام الطرد' })
  @IsString()
  @IsNotEmpty()
  pickup_address: string;

  @ApiProperty({ example: 36.7712, description: 'خط العرض لنقطة الاستلام (Latitude)' })
  @IsNumber()
  @Min(-90) @Max(90)
  pickup_lat: number;

  @ApiProperty({ example: 3.0588, description: 'خط الطول لنقطة الاستلام (Longitude)' })
  @IsNumber()
  @Min(-180) @Max(180)
  pickup_lng: number;

  @ApiProperty({ example: 'حي باب الزوار، الجزائر', description: 'عنوان تسليم الطرد' })
  @IsString()
  @IsNotEmpty()
  dropoff_address: string;

  @ApiProperty({ example: 36.7214, description: 'خط العرض لنقطة التسليم (Latitude)' })
  @IsNumber()
  @Min(-90) @Max(90)
  dropoff_lat: number;

  @ApiProperty({ example: 3.1824, description: 'خط الطول لنقطة التسليم (Longitude)' })
  @IsNumber()
  @Min(-180) @Max(180)
  dropoff_lng: number;

  @ApiPropertyOptional({ example: 'يرجى الاتصال عند الوصول - الطابق 2', description: 'ملاحظات إضافية للسائق' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ example: 'BIENVENUE', description: 'كود الخصم الترويجي إن وجد' })
  @IsString()
  @IsOptional()
  promo_code?: string;

  // ⛔ ملاحظة: لا يوجد حقل price هنا — Backend هو المسؤول الحصري عن حساب السعر
}
