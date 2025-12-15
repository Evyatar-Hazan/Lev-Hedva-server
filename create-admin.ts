import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔐 Creating admin user...');
    
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@levhedva.org' },
      update: {
        password: hashedPassword,
        isActive: true,
      },
      create: {
        email: 'admin@levhedva.org',
        password: hashedPassword,
        firstName: 'מנהל',
        lastName: 'מערכת',
        phone: '+972-50-1234567',
        role: UserRole.ADMIN,
        isActive: true,
      },
    });
    
    console.log('✅ Admin user created/updated:', admin.email);
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: Admin123!');
    console.log('👤 Role:', admin.role);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
