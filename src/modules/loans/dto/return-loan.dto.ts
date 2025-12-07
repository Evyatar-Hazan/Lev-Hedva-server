import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class ReturnLoanDto {
  @ApiProperty({
    example: 'cuid123456789',
    description: 'ID של ההשאלה להחזרה',
  })
  @IsString({ message: 'מזהה ההשאלה חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'מזהה ההשאלה הוא שדה חובה' })
  loanId: string;

  @ApiPropertyOptional({
    example: 'good',
    description: 'מצב הפריט בעת ההחזרה',
  })
  @IsOptional()
  @IsString({ message: 'מצב הפריט חייב להיות מחרוזת' })
  returnCondition?: string;

  @ApiPropertyOptional({
    example: 'הוחזר במצב טוב, ללא נזקים',
    description: 'הערות על מצב הפריט בהחזרה',
  })
  @IsOptional()
  @IsString({ message: 'הערות החזרה חייבות להיות מחרוזת' })
  @MaxLength(500, { message: 'הערות החזרה חייבות להכיל פחות מ-500 תווים' })
  returnNotes?: string;
}