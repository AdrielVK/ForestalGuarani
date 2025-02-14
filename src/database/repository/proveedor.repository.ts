import { Proveedor } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreateProveedorDto } from 'src/dto/proveedor.dto';

@Injectable()
export class ProveedorRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Proveedor | null> {
    try {
      return await this.prisma.proveedor.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async listProveedores(): Promise<Proveedor[]> {
    return await this.prisma.proveedor.findMany();
  }

  public async createProveedor(
    data: CreateProveedorDto,
  ): Promise<Proveedor | null> {
    try {
      return this.prisma.proveedor.create({
        data: {
          nombre: data.nombre,
        },
      });
    } catch {
      return null;
    }
  }

  public async findByName(nombre: string): Promise<Proveedor | null> {
    try {
      return this.prisma.proveedor.findUnique({ where: { nombre } });
    } catch {
      return null;
    }
  }
}
