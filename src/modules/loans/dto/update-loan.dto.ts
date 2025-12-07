import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

export class UpdateLoanDto {
  @ApiPropertyOptional({
    example: '2024-01-20T00:00:00.000Z',
    description: 'תאריך החזרה צפוי מעודכן',
  })
  @IsOptional()
  @IsDateString({}, { message: 'תאריך החזרה הצפוי חייב להיות בפורמט תאריך תקין' })
  expectedReturnDate?: string;

  @ApiPropertyOptional({
    example: 'עדכון: הארכת השאלה לשבוע נוסף',
    description: 'הערות מעודכנות על ההשאלה',
  })
  @IsOptional()
  @IsString({ message: 'הערות חייבות להיות מחרוזת' })
  @MaxLength(500, { message: 'הערות חייבות להכיל פחות מ-500 תווים' })
  notes?: string;
}