import { Prisma as PrismaService } from '../prisma';
import { Cliente } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from 'src/dto/cliente.dto';

@Injectable()
export class ClienteRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createCliente(data: CreateClienteDto): Promise<Cliente | null> {
    try {
      return await this.prisma.cliente.create({ data });
    } catch {
      return null;
    }
  }

  public async findClienteById(id: number): Promise<Cliente | null> {
    try {
      return await this.prisma.cliente.findUnique({
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }

  public async listClientes(): Promise<Cliente[] | null> {
    try {
      return await this.prisma.cliente.findMany();
    } catch {
      return null;
    }
  }

  public async findClienteByNumero(numero: string): Promise<Cliente | null> {
    try {
      return await this.prisma.cliente.findUnique({
        where: {
          numero,
        },
      });
    } catch {
      return null;
    }
  }
}
