import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 это делает PrismaService доступным в других модулях
})
export class PrismaModule {}
