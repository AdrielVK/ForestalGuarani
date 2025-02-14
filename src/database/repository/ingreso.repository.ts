import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreateIngresoDBDto } from 'src/dto/ingresos.dto';
import { Ingreso, Prisma } from '@prisma/client';

@Injectable()
export class IngresoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createIngreso(
    data: CreateIngresoDBDto,
  ): Promise<Ingreso | null> {
    try {
      return await this.prisma.ingreso.create({ data });
    } catch {
      return null;
    }
  }

  public async getListIngreso(): Promise<
    | Prisma.IngresoGetPayload<{
        include: {
          proveedor: true;
          remito: true;
          equipo: {
            include: {
              rolliso: true;
              posicion: true;
            };
          };
        };
      }>[]
    | null
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.ingreso.findMany({
        include: {
          proveedor: true,
          remito: true,
          equipo: {
            include: {
              rolliso: true,
              posicion: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async getCompleteIngresoDetail(
    id: number,
  ): Promise<Prisma.IngresoGetPayload<{
    include: {
      proveedor: true;
      remito: true;
      equipo: {
        include: {
          rolliso: true;
          posicion: true;
        };
      };
    };
  }> | null> {
    try {
      return await this.prisma.ingreso.findUnique({
        where: { id: id },
        include: {
          proveedor: true,
          remito: true,
          equipo: {
            include: {
              rolliso: true,
              posicion: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }
}
