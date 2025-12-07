import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
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
    example: 'יוסי',
    description: 'User first name',
  })
  @IsString({ message: 'השם הפרטי חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'השם הפרטי הוא שדה חובה' })
  @MaxLength(50, { message: 'השם הפרטי חייב להכיל פחות מ-50 תווים' })
  firstName: string;

  @ApiProperty({
    example: 'כהן',
    description: 'User last name',
  })
  @IsString({ message: 'שם המשפחה חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'שם המשפחה הוא שדה חובה' })
  @MaxLength(50, { message: 'שם המשפחה חייב להכיל פחות מ-50 תווים' })
  lastName: string;

  @ApiPropertyOptional({
    example: '+972-50-1234567',
    description: 'User phone number',
  })
  @IsOptional()
  @IsString({ message: 'מספר הטלפון חייב להיות מחרוזת' })
  @MaxLength(20, { message: 'מספר הטלפון חייב להכיל פחות מ-20 תווים' })
  phone?: string;

  @ApiProperty({
    example: UserRole.CLIENT,
    description: 'User role',
    enum: UserRole,
  })
  @IsEnum(UserRole, { message: 'תפקיד המשתמש לא תקין' })
  role: UserRole;

  @ApiPropertyOptional({
    example: true,
    description: 'Is user active',
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'סטטוס המשתמש חייב להיות true או false' })
  isActive?: boolean;
}