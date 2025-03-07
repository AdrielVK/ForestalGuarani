import { CreateRemitoDto } from 'src/dto/remito.dto';
import { Prisma as PrismaService } from '../prisma';
import { Remito } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemitoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createRemito(data: CreateRemitoDto): Promise<Remito | null> {
    try {
      return await this.prisma.remito.create({ data });
    } catch {
      return null;
    }
  }
}
