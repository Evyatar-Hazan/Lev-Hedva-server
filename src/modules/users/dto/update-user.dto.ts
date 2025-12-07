import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const)
) {
  @ApiPropertyOptional({
    example: 'NewSecurePassword123!',
    description: 'New password for the user',
    minLength: 8,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'הסיסמה חייבת להיות מחרוזת' })
  @MinLength(8, { message: 'הסיסמה חייבת להכיל לפחות 8 תווים' })
  @MaxLength(50, { message: 'הסיסמה חייבת להכיל פחות מ-50 תווים' })
  password?: string;
}