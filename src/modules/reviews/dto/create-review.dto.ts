import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'معرف الطلب المكتمل' })
  @IsUUID()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty({ example: 5, description: 'التقييم من 1 إلى 5 نجوم', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 'توصيل سريع وسائق محترم ومحترف جداً', description: 'ملاحظة أو تعليق' })
  @IsString()
  @IsOptional()
  comment?: string;
}
