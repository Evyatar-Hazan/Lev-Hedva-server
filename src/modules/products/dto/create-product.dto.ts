import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'כסא גלגלים חשמלי',
    description: 'Product name',
  })
  @IsString({ message: 'שם המוצר חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'שם המוצר הוא שדה חובה' })
  @MinLength(2, { message: 'שם המוצר חייב להכיל לפחות 2 תווים' })
  @MaxLength(100, { message: 'שם המוצר חייב להכיל פחות מ-100 תווים' })
  name: string;

  @ApiPropertyOptional({
    example: 'כסא גלגלים חשמלי מתקדם עם בקרה אלקטרונית',
    description: 'Product description',
  })
  @IsOptional()
  @IsString({ message: 'תיאור המוצר חייב להיות מחרוזת' })
  @MaxLength(500, { message: 'תיאור המוצר חייב להכיל פחות מ-500 תווים' })
  description?: string;

  @ApiProperty({
    example: 'כסאות גלגלים',
    description: 'Product category',
  })
  @IsString({ message: 'קטגוריית המוצר חייבת להיות מחרוזת' })
  @IsNotEmpty({ message: 'קטגוריית המוצר היא שדה חובה' })
  @MaxLength(50, { message: 'קטגוריית המוצר חייבת להכיל פחות מ-50 תווים' })
  category: string;

  @ApiPropertyOptional({
    example: 'Invacare',
    description: 'Product manufacturer',
  })
  @IsOptional()
  @IsString({ message: 'יצרן המוצר חייב להיות מחרוזת' })
  @MaxLength(50, { message: 'שם היצרן חייב להכיל פחות מ-50 תווים' })
  manufacturer?: string;

  @ApiPropertyOptional({
    example: 'Pronto M41',
    description: 'Product model',
  })
  @IsOptional()
  @IsString({ message: 'דגם המוצר חייב להיות מחרוזת' })
  @MaxLength(50, { message: 'דגם המוצר חייב להכיל פחות מ-50 תווים' })
  model?: string;
}