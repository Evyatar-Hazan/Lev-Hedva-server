import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '@prisma/client';

export class QueryUsersDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'מספר העמוד חייב להיות מספר' })
  @Min(1, { message: 'מספר העמוד חייב להיות לפחות 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'מספר הפריטים בעמוד חייב להיות מספר' })
  @Min(1, { message: 'מספר הפריטים בעמוד חייב להיות לפחות 1' })
  @Max(100, { message: 'מספר הפריטים בעמוד חייב להיות לכל היותר 100' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Search term for name or email',
  })
  @IsOptional()
  @IsString({ message: 'מונח החיפוש חייב להיות מחרוזת' })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by user role',
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'תפקיד המשתמש לא תקין' })
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Filter by active status',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: 'סטטוס פעיל חייב להיות true או false' })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: ['createdAt', 'updatedAt', 'firstName', 'lastName', 'email'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: 'שדה המיון חייב להיות מחרוזת' })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsString({ message: 'כיוון המיון חייב להיות מחרוזת' })
  sortOrder?: 'asc' | 'desc' = 'desc';
}