import { Prisma as PrismaService } from '../prisma';
import { CabadoMadera } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CabadoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createCabado(nombre: string): Promise<CabadoMadera | null> {
    try {
      return await this.prisma.cabadoMadera.create({
        data: { nombre: nombre },
      });
    } catch {
      return null;
    }
  }

  public async findCabadoById(id: number): Promise<CabadoMadera | null> {
    try {
      return await this.prisma.cabadoMadera.findUnique({
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }

  public async findCabadoByNombre(
    nombre: string,
  ): Promise<CabadoMadera | null> {
    try {
      return await this.prisma.cabadoMadera.findUnique({
        where: {
          nombre,
        },
      });
    } catch {
      return null;
    }
  }
}
