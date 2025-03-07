import { Escuadria } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import {
  CreateEscuadriaDto,
  FindByPropsEscuadriaDto,
} from 'src/dto/escuadria.dto';

@Injectable()
export class EscuadriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Escuadria | null> {
    try {
      return await this.prisma.escuadria.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async finByProps(
    data: FindByPropsEscuadriaDto,
  ): Promise<Escuadria | null> {
    try {
      return await this.prisma.escuadria.findUnique({
        where: { longitud_altura_ancho: data },
      });
    } catch {
      return null;
    }
  }

  public async deleteEscuadria(id: number): Promise<Escuadria | null> {
    try {
      return await this.prisma.escuadria.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  public async createEscuadria(
    data: CreateEscuadriaDto,
  ): Promise<Escuadria | null> {
    try {
      return this.prisma.escuadria.create({
        data,
      });
    } catch {
      return null;
    }
  }
}
