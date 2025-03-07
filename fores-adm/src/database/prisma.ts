import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class Prisma extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
