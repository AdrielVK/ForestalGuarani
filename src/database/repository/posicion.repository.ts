import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { Posicion, Prisma } from '@prisma/client';

@Injectable()
export class PosicionRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createPosicion(identificador: number): Promise<Posicion | null> {
    try {
      return await this.prisma.posicion.create({
        data: { identificador, ocupado: false },
      });
    } catch {
      return null;
    }
  }

  public async findPosicionByIdentificador(
    identificador: number,
  ): Promise<Posicion | null> {
    try {
      return await this.prisma.posicion.findUnique({
        where: {
          identificador: identificador,
        },
      });
    } catch {
      return null;
    }
  }

  public async countOfPosicion(): Promise<number | null> {
    try {
      return await this.prisma.posicion.count();
    } catch {
      return null;
    }
  }

  public async listOfPosicion(): Promise<Posicion[] | null> {
    try {
      return await this.prisma.posicion.findMany({
        orderBy: { identificador: 'asc' },
      });
    } catch {
      return null;
    }
  }

  public async listStockByPosicion(): Promise<
    Prisma.PosicionGetPayload<{
      include: {
        equipo: {
          include: {
            rolliso: true;
          };
        };
      };
    }>[]
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.posicion.findMany({
        where: {
          equipoId: { not: null },
        },
        include: {
          equipo: {
            include: {
              rolliso: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async deletePosicion(id: number): Promise<Posicion | null> {
    try {
      return await this.prisma.posicion.delete({
        where: { id: id },
      });
    } catch {
      return null;
    }
  }

  public async findByEquipoId(equipoId: number): Promise<Posicion | null> {
    try {
      return await this.prisma.posicion.findUnique({
        where: {
          equipoId,
        },
      });
    } catch {
      return null;
    }
  }

  public async setFreePosicion(id: number): Promise<Posicion | null> {
    try {
      return await this.prisma.posicion.update({
        where: { id: id },
        data: {
          equipoId: null,
          ocupado: false,
        },
      });
    } catch {
      return null;
    }
  }

  public async associateEquipoToPosicion(
    equipoId: number,
    posicionId: number,
  ): Promise<Posicion | null> {
    try {
      return await this.prisma.posicion.update({
        where: { id: posicionId },
        data: {
          equipoId: equipoId,
          ocupado: true,
        },
      });
    } catch {
      return null;
    }
  }
}
