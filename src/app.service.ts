// src/app.service.ts или chat.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const chat = await this.prisma.chat.findFirst();
    if (!chat) {
      await this.prisma.chat.create({
        data: { name: 'General' },
      });
      console.log('✅ Создан общий чат');
    }
  }
}
