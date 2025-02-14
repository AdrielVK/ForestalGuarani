import { Rolliso } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreateRollisoDto, FindRollisoDto } from 'src/dto/rolliso.dto';

@Injectable()
export class RollisoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Rolliso | null> {
    return await this.prisma.rolliso.findUnique({ where: { id } });
  }

  /*public async associateEquipoToRolliso(
    rollisoId: number,
    equipoId: number,
  ): Promise<Rolliso | null> {
    try {
      return this.prisma.rolliso.update({
        where: { id: rollisoId },
        data: {
          equipo: {
            connect: { id: equipoId },
          },
        },
        include: { equipo: true },
      });
    } catch {
      return null;
    }
  }*/

  public async create(data: CreateRollisoDto): Promise<Rolliso | null> {
    return this.prisma.rolliso.create({
      data: {
        ...(data.equipoId && {
          equipos: {
            connect: { id: data.equipoId },
          },
        }),
        tipo: data.tipo,
        diametro: data.diametro,
        longitud: data.longitud,
      },
    });
  }

  public async findByProps(data: FindRollisoDto): Promise<Rolliso | null> {
    try {
      return await this.prisma.rolliso.findUnique({
        where: {
          tipo_diametro_longitud: {
            tipo: data.tipo,
            diametro: data.diametro,
            longitud: data.longitud,
          },
        },
      });
    } catch {
      return null;
    }
  }
}
