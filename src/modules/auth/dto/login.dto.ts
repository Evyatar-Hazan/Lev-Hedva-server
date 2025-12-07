import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@levhedva.org',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'כתובת אימייל לא תקינה' })
  @IsNotEmpty({ message: 'אימייל הוא שדה חובה' })
  email: string;

  @ApiProperty({
    example: 'Admin123!@#',
    description: 'User password',
    minLength: 8,
    maxLength: 50,
  })
  @IsString({ message: 'הסיסמה חייבת להיות מחרוזת' })
  @IsNotEmpty({ message: 'סיסמה היא שדה חובה' })
  @MinLength(8, { message: 'הסיסמה חייבת להכיל לפחות 8 תווים' })
  @MaxLength(50, { message: 'הסיסמה חייבת להכיל פחות מ-50 תווים' })
  password: string;
}