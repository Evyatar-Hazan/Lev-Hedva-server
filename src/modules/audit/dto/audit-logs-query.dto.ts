import { IsOptional, IsString, IsEnum, IsUUID, IsDateString, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AuditActionType, AuditEntityType } from './create-audit-log.dto';

export class AuditLogsQueryDto {
  @ApiPropertyOptional({
    description: 'מספר עמוד',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'מספר פריטים בעמוד',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'חיפוש טקסט חופשי',
    example: 'משתמש',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'סינון לפי סוג פעולה',
    enum: AuditActionType,
  })
  @IsOptional()
  @IsEnum(AuditActionType)
  action?: AuditActionType;

  @ApiPropertyOptional({
    description: 'סינון לפי סוג ישות',
    enum: AuditEntityType,
  })
  @IsOptional()
  @IsEnum(AuditEntityType)
  entityType?: AuditEntityType;

  @ApiPropertyOptional({
    description: 'סינון לפי מזהה ישות',
  })
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional({
    description: 'סינון לפי מזהה משתמש',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'סינון לפי כתובת IP',
  })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'מתאריך',
    format: 'date',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'עד תאריך',
    format: 'date',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'שדה מיון',
    enum: ['createdAt', 'action', 'entityType', 'userId'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsEnum(['createdAt', 'action', 'entityType', 'userId'])
  sortBy?: 'createdAt' | 'action' | 'entityType' | 'userId' = 'createdAt';

  @ApiPropertyOptional({
    description: 'כיוון מיון',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    description: 'סינון לפי קוד סטטוס HTTP',
    example: 200,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  statusCode?: number;

  @ApiPropertyOptional({
    description: 'חיפוש רק פעולות עם שגיאות',
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  errorsOnly?: boolean = false;
}