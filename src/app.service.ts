import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Lev Hedva API is running!';
  }

  async getHealth() {
    const dbHealthy = await this.prisma.isHealthy();
    
    return {
      status: dbHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'Lev Hedva API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbHealthy ? 'connected' : 'disconnected',
      },
    };
  }
}// test change
