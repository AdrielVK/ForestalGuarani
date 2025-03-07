import { Prisma as PrismaService } from '../prisma';
import { EsquemaCorte } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  CreateEsquemaEntityDto,
  FindEsquemaByProps,
} from 'src/dto/esquema.dto';

@Injectable()
export class EsquemaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createEsquema(
    data: CreateEsquemaEntityDto,
  ): Promise<EsquemaCorte | null> {
    try {
      return await this.prisma.esquemaCorte.create({ data });
    } catch {
      return null;
    }
  }

  public async findById(id: number): Promise<EsquemaCorte | null> {
    try {
      return await this.prisma.esquemaCorte.findUnique({
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }

  public async findByProps(
    data: FindEsquemaByProps,
  ): Promise<EsquemaCorte | null> {
    try {
      return await this.prisma.esquemaCorte.findUnique({
        where: {
          longitud_ancho_espesor: {
            longitud: data.longitud,
            ancho: data.ancho,
            espesor: data.espesor,
          },
        },
      });
    } catch {
      return null;
    }
  }
}
