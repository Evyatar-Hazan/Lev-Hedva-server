import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    example: 'cuid123456789',
    description: 'ID של המשתמש המבקש השאלה',
  })
  @IsString({ message: 'מזהה המשתמש חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'מזהה המשתמש הוא שדה חובה' })
  userId: string;

  @ApiProperty({
    example: 'cuid987654321',
    description: 'ID של פריט המוצר להשאלה',
  })
  @IsString({ message: 'מזהה פריט המוצר חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'מזהה פריט המוצר הוא שדה חובה' })
  productInstanceId: string;

  @ApiPropertyOptional({
    example: '2024-01-15T00:00:00.000Z',
    description: 'תאריך החזרה צפוי',
  })
  @IsOptional()
  @IsDateString({}, { message: 'תאריך החזרה הצפוי חייב להיות בפורמט תאריך תקין' })
  expectedReturnDate?: string;

  @ApiPropertyOptional({
    example: 'השאלה לטיול משפחתי',
    description: 'הערות נוספות על ההשאלה',
  })
  @IsOptional()
  @IsString({ message: 'הערות חייבות להיות מחרוזת' })
  @MaxLength(500, { message: 'הערות חייבות להכיל פחות מ-500 תווים' })
  notes?: string;
}