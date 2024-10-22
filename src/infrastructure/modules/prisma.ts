import { PrismaClient } from '@prisma/client';

export class PrismaModule {
  private static prisma: PrismaClient;
  static getInstance() {
    if (!PrismaModule.prisma) {
      PrismaModule.prisma = new PrismaClient();
    }
    return PrismaModule.prisma;
  }
}
