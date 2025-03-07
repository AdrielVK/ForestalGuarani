import { Estado } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreateEstadoDto } from 'src/dto/estado.dto';

@Injectable()
export class EstadoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Estado | null> {
    try {
      return await this.prisma.estado.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async findByValue(value: string): Promise<Estado | null> {
    try {
      return await this.prisma.estado.findUnique({
        where: { value },
      });
    } catch {
      return null;
    }
  }

  public async deletePaquete(id: number): Promise<Estado | null> {
    try {
      return await this.prisma.estado.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  public async createPaquete(data: CreateEstadoDto): Promise<Estado | null> {
    try {
      return this.prisma.estado.create({
        data,
      });
    } catch {
      return null;
    }
  }
}
