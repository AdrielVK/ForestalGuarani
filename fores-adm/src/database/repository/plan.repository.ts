import { CreatePlanProdEntityDto } from 'src/dto/plan.dto';
import { Prisma as PrismaService } from '../prisma';
import { Injectable } from '@nestjs/common';
import { PlanProduccion, Prisma } from '@prisma/client';

@Injectable()
export class PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createPlan(
    data: CreatePlanProdEntityDto,
  ): Promise<PlanProduccion | null> {
    try {
      return await this.prisma.planProduccion.create({ data });
    } catch {
      return null;
    }
  }

  public async changeStatus(
    value: boolean,
    id: number,
  ): Promise<PlanProduccion | null> {
    try {
      return await this.prisma.planProduccion.update({
        where: { id },
        data: {
          activo: value,
        },
      });
    } catch {
      return null;
    }
  }

  public async listOfPlan(): Promise<
    | Prisma.PlanProduccionGetPayload<{
        include: {
          esquema: true;
        };
      }>[]
    | null
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.planProduccion.findMany({
        include: {
          esquema: true,
        },
        orderBy: {
          fecha_inicio: 'desc',
        },
      });
    } catch {
      return null;
    }
  }

  public async detailById(id: number): Promise<Prisma.PlanProduccionGetPayload<{
    include: {
      esquema: true;
    };
  }> | null> {
    try {
      return await this.prisma.planProduccion.findUnique({
        where: {
          id,
        },
        include: {
          esquema: true,
        },
      });
    } catch {
      return null;
    }
  }

  public async findById(id: number): Promise<PlanProduccion | null> {
    try {
      return await this.prisma.planProduccion.findUnique({
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }
}
