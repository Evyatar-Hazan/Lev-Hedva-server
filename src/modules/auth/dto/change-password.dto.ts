import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'OldPassword123!',
    description: 'Current password',
  })
  @IsString({ message: 'הסיסמה הנוכחית חייבת להיות מחרוזת' })
  @IsNotEmpty({ message: 'הסיסמה הנוכחית היא שדה חובה' })
  currentPassword: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description: 'New password',
  })
  @IsString({ message: 'הסיסמה החדשה חייבת להיות מחרוזת' })
  @IsNotEmpty({ message: 'הסיסמה החדשה היא שדה חובה' })
  @MinLength(8, { message: 'הסיסמה החדשה חייבת להכיל לפחות 8 תווים' })
  newPassword: string;
}
