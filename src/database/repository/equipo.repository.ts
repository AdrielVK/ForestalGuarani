import { Equipo, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreateEquipoDto } from 'src/dto/equipo.dto';

@Injectable()
export class EquipoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Equipo | null> {
    try {
      return await this.prisma.equipo.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async listEquiposStock(): Promise<
    Prisma.EquipoGetPayload<{
      include: {
        rolliso: true;
        posicion: true;
      };
    }>[]
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.equipo.findMany({
        where: {
          rollisoId: { not: null },
          posicion: { isNot: null },
        },
        include: {
          rolliso: true,
          posicion: true,
        },
      });
    } catch {
      return null;
    }
  }

  public async findByRolliso(rollisoId: number): Promise<Equipo | null> {
    try {
      return await this.prisma.equipo.findFirst({
        where: {
          rollisoId: rollisoId,
          posicion: {
            is: null,
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async createEquipo(data: CreateEquipoDto): Promise<Equipo | null> {
    try {
      return await this.prisma.equipo.create({
        data,
      });
    } catch {
      return null;
    }
  }

  public async associateEquipoToIngreso(
    equipoId: number,
    ingresoId: number,
  ): Promise<Equipo | null> {
    try {
      return this.prisma.equipo.update({
        where: { id: equipoId },
        data: {
          ingresoId: ingresoId,
        },
      });
    } catch {
      return null;
    }
  }

  public async associateEquipoToRolliso(
    equipoId: number,
    rollisoId: number,
  ): Promise<Equipo | null> {
    try {
      return this.prisma.equipo.update({
        where: { id: equipoId },
        data: {
          rollisoId: rollisoId,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
