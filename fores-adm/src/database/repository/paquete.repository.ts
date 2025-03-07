import { Paquete } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreatePaqueteDto } from 'src/dto/paquete.dto';

@Injectable()
export class PaqueteRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Paquete | null> {
    try {
      return await this.prisma.paquete.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async findByIdentificador(value: string): Promise<Paquete | null> {
    try {
      return await this.prisma.paquete.findUnique({
        where: { identificador: value },
      });
    } catch {
      return null;
    }
  }

  public async deletePaquete(id: number): Promise<Paquete | null> {
    try {
      return await this.prisma.paquete.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  public async createPaquete(data: CreatePaqueteDto): Promise<Paquete | null> {
    try {
      return this.prisma.paquete.create({
        data,
      });
    } catch {
      return null;
    }
  }
}
