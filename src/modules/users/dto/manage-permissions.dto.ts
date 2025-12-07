import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class AssignPermissionsDto {
  @ApiProperty({
    description: 'Array of permission names to assign',
    example: ['users.read', 'users.write', 'products.read'],
    type: [String],
  })
  @IsArray({ message: 'הרשאות חייבות להיות מערך' })
  @ArrayNotEmpty({ message: 'חייב לציין לפחות הרשאה אחת' })
  @IsString({ each: true, message: 'כל הרשאה חייבת להיות מחרוזת' })
  permissions: string[];
}

export class RevokePermissionsDto {
  @ApiProperty({
    description: 'Array of permission names to revoke',
    example: ['users.write', 'users.delete'],
    type: [String],
  })
  @IsArray({ message: 'הרשאות חייבות להיות מערך' })
  @ArrayNotEmpty({ message: 'חייב לציין לפחות הרשאה אחת' })
  @IsString({ each: true, message: 'כל הרשאה חייבת להיות מחרוזת' })
  permissions: string[];
}