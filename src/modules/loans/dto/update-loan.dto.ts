import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { LoanStatus } from '@prisma/client';

export class UpdateLoanDto {
  @ApiPropertyOptional({
    example: '2024-01-20T00:00:00.000Z',
    description: 'תאריך החזרה צפוי מעודכן',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'תאריך החזרה הצפוי חייב להיות בפורמט תאריך תקין' }
  )
  expectedReturnDate?: string;

  @ApiPropertyOptional({
    example: 'עדכון: הארכת השאלה לשבוע נוסף',
    description: 'הערות מעודכנות על ההשאלה',
  })
  @IsOptional()
  @IsString({ message: 'הערות חייבות להיות מחרוזת' })
  @MaxLength(500, { message: 'הערות חייבות להכיל פחות מ-500 תווים' })
  notes?: string;

  @ApiPropertyOptional({
    example: 'ACTIVE',
    description: 'סטטוס מעודכן של ההשאלה',
    enum: LoanStatus,
  })
  @IsOptional()
  @IsEnum(LoanStatus, {
    message: 'סטטוס ההשאלה חייב להיות אחד מהערכים המותרים',
  })
  status?: LoanStatus;
}
