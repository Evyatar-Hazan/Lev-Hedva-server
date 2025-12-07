import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    permissions: string[];
  };
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token',
  })
  @IsString({ message: 'Refresh token חייב להיות מחרוזת' })
  @IsNotEmpty({ message: 'Refresh token הוא שדה חובה' })
  refreshToken: string;
}