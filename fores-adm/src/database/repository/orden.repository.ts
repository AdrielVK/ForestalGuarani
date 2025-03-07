import { Prisma as PrismaService } from '../prisma';
import { Prisma, OrdenProd } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateOrdenProdDto } from 'src/dto/orden.dto';

@Injectable()
export class OrdenRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createOrden(
    data: CreateOrdenProdDto,
  ): Promise<OrdenProd | null> {
    try {
      return await this.prisma.ordenProd.create({ data });
    } catch {
      return null;
    }
  }

  public async associateOrdenToPlan(
    planId: number,
    ordenId: number,
  ): Promise<OrdenProd | null> {
    try {
      return await this.prisma.ordenProd.update({
        where: { id: ordenId },
        data: {
          planId: planId,
        },
      });
    } catch {
      return null;
    }
  }

  public async detailOrdenByPlanId(planId: number): Promise<
    | Prisma.OrdenProdGetPayload<{
        include: {
          cabado: true;
          cliente: true;
        };
      }>[]
    | null
  > {
    try {
      return await this.prisma.ordenProd.findMany({
        where: {
          planId: planId,
        },
        include: {
          cabado: true,
          cliente: true,
        },
      });
    } catch {
      return null;
    }
  }

  public async deleteOrden(id: number): Promise<string | null> {
    try {
      const deleted = await this.prisma.ordenProd.delete({
        where: {
          id,
        },
      });
      console.log('asdasd', deleted);
      if (!deleted) return null;

      return 'Orden eliminada';
    } catch {
      return null;
    }
  }

  public async listOrdenes(): Promise<
    Prisma.OrdenProdGetPayload<{
      include: {
        cabado: true;
        cliente: true;
      };
    }>[]
    // eslint-disable-next-line prettier/prettier
    > {
    try {
      return await this.prisma.ordenProd.findMany({
        include: {
          cabado: true,
          cliente: true,
        },
      });
    } catch {
      return null;
    }
  }

  public async listOrdenesFree(): Promise<
    Prisma.OrdenProdGetPayload<{
      include: {
        cabado: true;
        cliente: true;
      };
    }>[]
    // eslint-disable-next-line prettier/prettier
    > {
    try {
      return await this.prisma.ordenProd.findMany({
        where: {
          planId: null,
        },
        include: {
          cabado: true,
          cliente: true,
        },
      });
    } catch {
      return null;
    }
  }

  public async detailOrden(id: number): Promise<
    Prisma.OrdenProdGetPayload<{
      include: {
        cabado: true;
        cliente: true;
      };
    }>
  > {
    try {
      return await this.prisma.ordenProd.findUnique({
        where: {
          id,
        },
        include: {
          cabado: true,
          cliente: true,
        },
      });
    } catch {
      return null;
    }
  }

  public async findOrdenById(id: number): Promise<OrdenProd | null> {
    try {
      return await this.prisma.ordenProd.findUnique({
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }
}
