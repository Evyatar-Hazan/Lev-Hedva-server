import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class CreateProductInstanceDto {
  @ApiProperty({
    example: 'cuid123456789',
    description: 'Product ID that this instance belongs to',
  })
  @IsString({ message: 'מזהה המוצר חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'מזהה המוצר הוא שדה חובה' })
  productId: string;

  @ApiProperty({
    example: 'WC001',
    description: 'Product barcode (unique identifier)',
  })
  @IsString({ message: 'ברקוד המוצר חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'ברקוד המוצר הוא שדה חובה' })
  @MaxLength(50, { message: 'ברקוד המוצר חייב להכיל פחות מ-50 תווים' })
  barcode: string;

  @ApiPropertyOptional({
    example: 'IC-PM41-001',
    description: 'Product serial number',
  })
  @IsOptional()
  @IsString({ message: 'מספר סידורי חייב להיות מחרוזת' })
  @MaxLength(50, { message: 'מספר סידורי חייב להכיל פחות מ-50 תווים' })
  serialNumber?: string;

  @ApiProperty({
    example: 'excellent',
    description: 'Product condition',
    enum: ['excellent', 'good', 'fair', 'poor', 'needs-repair'],
  })
  @IsString({ message: 'מצב המוצר חייב להיות מחרוזת' })
  @IsIn(['excellent', 'good', 'fair', 'poor', 'needs-repair'], {
    message: 'מצב המוצר חייב להיות אחד מהערכים המותרים'
  })
  condition: string;

  @ApiPropertyOptional({
    example: 'מחסן א׳ - קומה 2',
    description: 'Product location',
  })
  @IsOptional()
  @IsString({ message: 'מיקום המוצר חייב להיות מחרוזת' })
  @MaxLength(100, { message: 'מיקום המוצר חייב להכיל פחות מ-100 תווים' })
  location?: string;

  @ApiPropertyOptional({
    example: 'הוחלפה בטריה חדשה, נבדק במעבדה',
    description: 'Additional notes about the product instance',
  })
  @IsOptional()
  @IsString({ message: 'הערות חייבות להיות מחרוזת' })
  @MaxLength(500, { message: 'הערות חייבות להכיל פחות מ-500 תווים' })
  notes?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Is product available for loan',
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'זמינות המוצר חייבת להיות true או false' })
  isAvailable?: boolean;
}