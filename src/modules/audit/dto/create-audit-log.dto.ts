import { IsString, IsEnum, IsObject, IsOptional, IsUUID, IsIP, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum AuditActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE', 
  DELETE = 'DELETE',
  READ = 'READ',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  FAILED_LOGIN = 'FAILED_LOGIN',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PERMISSION_CHANGE = 'PERMISSION_CHANGE',
  SYSTEM_EVENT = 'SYSTEM_EVENT',
  ERROR = 'ERROR',
}

export enum AuditEntityType {
  USER = 'USER',
  PRODUCT = 'PRODUCT',
  PRODUCT_INSTANCE = 'PRODUCT_INSTANCE',
  LOAN = 'LOAN',
  VOLUNTEER_ACTIVITY = 'VOLUNTEER_ACTIVITY',
  AUTH = 'AUTH',
  SYSTEM = 'SYSTEM',
}

export class CreateAuditLogDto {
  @ApiProperty({
    description: 'סוג הפעולה שבוצעה',
    enum: AuditActionType,
    example: AuditActionType.CREATE,
  })
  @IsEnum(AuditActionType)
  action: AuditActionType;

  @ApiProperty({
    description: 'סוג הישות על הפעולה בוצעה',
    enum: AuditEntityType,
    example: AuditEntityType.USER,
  })
  @IsEnum(AuditEntityType)
  entityType: AuditEntityType;

  @ApiPropertyOptional({
    description: 'מזהה הישות שעליה בוצעה הפעולה',
    format: 'uuid',
    example: 'user-123',
  })
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional({
    description: 'מזהה המשתמש שביצע הפעולה',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'כתובת IP ממנה בוצעה הפעולה',
    format: 'ipv4',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User Agent של הדפדפן',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty({
    description: 'תיאור הפעולה שבוצעה',
    example: 'משתמש חדש נוצר במערכת',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'נתונים נוספים בפורמט JSON',
    example: {
      oldValue: 'ערך ישן',
      newValue: 'ערך חדש',
      additionalInfo: 'מידע נוסף',
    },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'נתיב API שבוצע',
    example: '/api/users',
  })
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiPropertyOptional({
    description: 'שיטת HTTP',
    example: 'POST',
  })
  @IsOptional()
  @IsString()
  httpMethod?: string;

  @ApiPropertyOptional({
    description: 'קוד סטטוס HTTP',
    example: 201,
  })
  @IsOptional()
  statusCode?: number;

  @ApiPropertyOptional({
    description: 'זמן ביצוע הפעולה במילישניות',
    example: 150,
  })
  @IsOptional()
  executionTime?: number;

  @ApiPropertyOptional({
    description: 'הודעת שגיאה (במקרה של שגיאה)',
    example: 'משתמש לא נמצא',
  })
  @IsOptional()
  @IsString()
  errorMessage?: string;
}