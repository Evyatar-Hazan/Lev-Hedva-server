import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Max, IsDateString, MaxLength, IsOptional } from 'class-validator';

export class CreateVolunteerActivityDto {
  @ApiProperty({
    example: 'cuid123456789',
    description: 'ID של המתנדב',
  })
  @IsString({ message: 'מזהה המתנדב חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'מזהה המתנדב הוא שדה חובה' })
  volunteerId: string;

  @ApiProperty({
    example: 'סיוע בחלוקת ציוד',
    description: 'סוג הפעילות',
    enum: [
      'סיוע בחלוקת ציוד',
      'תחזוקה ותיקון',
      'מנהל וארגון',
      'הדרכה והכשרה',
      'פעילות קהילתית',
      'תמיכה טכנית',
      'עזרה במשרד',
      'פעילות מיוחדת',
      'אחר'
    ],
  })
  @IsString({ message: 'סוג הפעילות חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'סוג הפעילות הוא שדה חובה' })
  activityType: string;

  @ApiProperty({
    example: 'חלוקת כסאות גלגלים במרכז הרפואי',
    description: 'תיאור הפעילות',
  })
  @IsString({ message: 'תיאור הפעילות חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'תיאור הפעילות הוא שדה חובה' })
  @MaxLength(500, { message: 'תיאור הפעילות חייב להכיל פחות מ-500 תווים' })
  description: string;

  @ApiProperty({
    example: 4.5,
    description: 'מספר שעות הפעילות',
    minimum: 0.1,
    maximum: 24,
  })
  @IsNumber({}, { message: 'מספר השעות חייב להיות מספר' })
  @Min(0.1, { message: 'מספר השעות חייב להיות לפחות 0.1' })
  @Max(24, { message: 'מספר השעות חייב להיות פחות מ-24' })
  hours: number;

  @ApiProperty({
    example: '2024-01-15T09:00:00.000Z',
    description: 'תאריך הפעילות',
  })
  @IsDateString({}, { message: 'תאריך הפעילות חייב להיות בפורמט תאריך תקין' })
  date: string;

  @ApiPropertyOptional({
    example: 'פעילות מוצלחת, חולקו 5 כסאות גלגלים',
    description: 'הערות נוספות על הפעילות',
  })
  @IsOptional()
  @IsString({ message: 'הערות חייבות להיות מחרוזת' })
  @MaxLength(1000, { message: 'הערות חייבות להכיל פחות מ-1000 תווים' })
  notes?: string;
}