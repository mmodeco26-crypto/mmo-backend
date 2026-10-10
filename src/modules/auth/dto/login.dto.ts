import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '01012345678', description: 'رقم الهاتف المسجل' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Password123!', description: 'كلمة المرور' })
  @IsString()
  @MinLength(4)
  password: string;
}
