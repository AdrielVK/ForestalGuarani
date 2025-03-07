import { Pieza } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreatePiezaDto } from 'src/dto/pieza.dto';

@Injectable()
export class PiezaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Pieza | null> {
    try {
      return await this.prisma.pieza.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async deletePieza(id: number): Promise<Pieza | null> {
    try {
      return await this.prisma.pieza.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  public async createPieza(data: CreatePiezaDto): Promise<Pieza | null> {
    try {
      return this.prisma.pieza.create({
        data,
      });
    } catch {
      return null;
    }
  }
}
