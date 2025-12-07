import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'כתובת אימייל לא תקינה' })
  @IsNotEmpty({ message: 'אימייל הוא שדה חובה' })
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'User password',
    minLength: 8,
    maxLength: 50,
  })
  @IsString({ message: 'הסיסמה חייבת להיות מחרוזת' })
  @IsNotEmpty({ message: 'סיסמה היא שדה חובה' })
  @MinLength(8, { message: 'הסיסמה חייבת להכיל לפחות 8 תווים' })
  @MaxLength(50, { message: 'הסיסמה חייבת להכיל פחות מ-50 תווים' })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  @IsString({ message: 'השם הפרטי חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'השם הפרטי הוא שדה חובה' })
  @MaxLength(50, { message: 'השם הפרטי חייב להכיל פחות מ-50 תווים' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @IsString({ message: 'שם המשפחה חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'שם המשפחה הוא שדה חובה' })
  @MaxLength(50, { message: 'שם המשפחה חייב להכיל פחות מ-50 תווים' })
  lastName: string;

  @ApiProperty({
    example: '+972-50-1234567',
    description: 'User phone number',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'מספר הטלפון חייב להיות מחרוזת' })
  @MaxLength(20, { message: 'מספר הטלפון חייב להכיל פחות מ-20 תווים' })
  phone?: string;

  @ApiProperty({
    example: UserRole.CLIENT,
    description: 'User role',
    enum: UserRole,
    required: false,
    default: UserRole.CLIENT,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'תפקיד המשתמש לא תקין' })
  role?: UserRole;
}