import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsDateString, MaxLength, IsOptional } from 'class-validator';

export class UpdateVolunteerActivityDto {
  @ApiPropertyOptional({
    example: 'תחזוקה ותיקון',
    description: 'סוג הפעילות מעודכן',
  })
  @IsOptional()
  @IsString({ message: 'סוג הפעילות חייב להיות מחרוזת' })
  activityType?: string;

  @ApiPropertyOptional({
    example: 'תיקון כסאות גלגלים במחסן',
    description: 'תיאור הפעילות מעודכן',
  })
  @IsOptional()
  @IsString({ message: 'תיאור הפעילות חייב להיות מחרוזת' })
  @MaxLength(500, { message: 'תיאור הפעילות חייב להכיל פחות מ-500 תווים' })
  description?: string;

  @ApiPropertyOptional({
    example: 6,
    description: 'מספר שעות הפעילות מעודכן',
    minimum: 0.1,
    maximum: 24,
  })
  @IsOptional()
  @IsNumber({}, { message: 'מספר השעות חייב להיות מספר' })
  @Min(0.1, { message: 'מספר השעות חייב להיות לפחות 0.1' })
  @Max(24, { message: 'מספר השעות חייב להיות פחות מ-24' })
  hours?: number;

  @ApiPropertyOptional({
    example: '2024-01-16T10:00:00.000Z',
    description: 'תאריך הפעילות מעודכן',
  })
  @IsOptional()
  @IsDateString({}, { message: 'תאריך הפעילות חייב להיות בפורמט תאריך תקין' })
  date?: string;

  @ApiPropertyOptional({
    example: 'הפעילות הושלמה בהצלחה, תוקנו 3 כסאות גלגלים',
    description: 'הערות נוספות מעודכנות',
  })
  @IsOptional()
  @IsString({ message: 'הערות חייבות להיות מחרוזת' })
  @MaxLength(1000, { message: 'הערות חייבות להכיל פחות מ-1000 תווים' })
  notes?: string;
}