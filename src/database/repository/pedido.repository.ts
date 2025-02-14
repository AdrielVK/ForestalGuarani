import { Pedido, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreatePedidoDto } from 'src/dto/pedido.dto';

@Injectable()
export class PedidoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Pedido | null> {
    try {
      return await this.prisma.pedido.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async deleteCompletePedido(id: number): Promise<Pedido | null> {
    try {
      return await this.prisma.pedido.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  public async createPedido(data: CreatePedidoDto): Promise<Pedido | null> {
    try {
      return this.prisma.pedido.create({
        data,
      });
    } catch {
      return null;
    }
  }

  public async getCompletePedidoDetail(id: number): Promise<
    Prisma.PedidoGetPayload<{
      include: {
        proveedor: true;
        equipos: {
          include: {
            rolliso: true;
          };
        };
      };
    }>
    // eslint-disable-next-line indent
  > {
    return await this.prisma.pedido.findUnique({
      where: { id: id },
      include: {
        proveedor: true,
        equipos: {
          include: {
            rolliso: true,
          },
        },
      },
    });
  }

  public async listCompletePedidoByDate(): Promise<
    Prisma.PedidoGetPayload<{
      include: {
        proveedor: true;
        equipos: {
          include: {
            rolliso: true;
          };
        };
      };
    }>[]
    // eslint-disable-next-line indent
  > {
    return await this.prisma.pedido.findMany({
      orderBy: { fecha: 'desc' },
      include: {
        proveedor: true,
        equipos: {
          include: {
            rolliso: true,
          },
        },
      },
    });
  }
}
