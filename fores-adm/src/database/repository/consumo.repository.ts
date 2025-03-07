import { AssociateConsumoToPlanDto } from './../../dto/plan.dto';
import { Prisma as PrismaService } from '../prisma';
import { Injectable } from '@nestjs/common';
import { Consumo, Prisma } from '@prisma/client';
import { CreateConsumoEntityDto } from 'src/dto/consumo.dto';

@Injectable()
export class ConsumoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateConsumoEntityDto): Promise<Consumo | null> {
    try {
      return await this.prisma.consumo.create({ data });
    } catch {
      return null;
    }
  }

  public async associateConsumoToPlan(
    data: AssociateConsumoToPlanDto,
  ): Promise<Prisma.ConsumoGetPayload<{
    include: {
      equipo: {
        include: {
          rolliso: true;
        };
      };
    };
  }> | null> {
    try {
      return await this.prisma.consumo.update({
        where: {
          id: data.consumoId,
        },
        data: {
          planId: data.planId,
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

  public async findByPlanId(planId: number): Promise<
    | Prisma.ConsumoGetPayload<{
        include: {
          equipo: {
            include: {
              rolliso: true;
            };
          };
        };
      }>[]
    | null
  > {
    try {
      return await this.prisma.consumo.findMany({
        where: {
          planId,
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

  public async findById(id: number): Promise<
    Prisma.ConsumoGetPayload<{
      include: {
        equipo: {
          include: {
            rolliso: true;
          };
        };
      };
    }>
  > {
    try {
      return await this.prisma.consumo.findUnique({
        where: {
          id,
        },
        include: {
          equipo: {
            include: {
              rolliso: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error en findById:', error);
      return null;
    }
  }
}
