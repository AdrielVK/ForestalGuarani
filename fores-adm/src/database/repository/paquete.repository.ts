import { Paquete, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreatePaqueteDto, EditPaqueteDto } from 'src/dto/paquete.dto';

@Injectable()
export class PaqueteRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Paquete | null> {
    try {
      return await this.prisma.paquete.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async findByIdentificador(value: string): Promise<Paquete | null> {
    try {
      return await this.prisma.paquete.findUnique({
        where: { identificador: value },
      });
    } catch {
      return null;
    }
  }

  public async deletePaquete(id: number): Promise<Paquete | null> {
    try {
      return await this.prisma.paquete.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  public async listPaquetesWithoutOrden(): Promise<
    | Prisma.PaqueteGetPayload<{
        include: {
          orden: true;
          estado: true;
          pieza: {
            include: {
              escuadria: true;
            };
          };
        };
      }>[]
    | null
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.paquete.findMany({
        where: {
          ordenId: null,
        },
        include: {
          orden: true,
          estado: true,
          pieza: {
            include: {
              escuadria: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async listPaquetesWithoutCiclo(): Promise<
    | Prisma.PaqueteGetPayload<{
        include: {
          orden: true;
          estado: true;
        };
      }>[]
    | null
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.paquete.findMany({
        where: {
          CicloSecado: null,
        },
        include: {
          orden: true,
          estado: true,
        },
      });
    } catch {
      return null;
    }
  }

  public async listPaquetes(): Promise<
    | Prisma.PaqueteGetPayload<{
        include: {
          orden: {
            include: {
              cliente: true;
              cabado: true;
            };
          };
          estado: true;
          pieza: {
            include: {
              escuadria: true;
            };
          };
        };
      }>[]
    | null
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.paquete.findMany({
        include: {
          orden: {
            include: {
              cliente: true,
              cabado: true,
            },
          },
          estado: true,
          pieza: {
            include: {
              escuadria: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async existsIdentificador(value: string): Promise<boolean> {
    const paquete = await this.prisma.paquete.findUnique({
      where: { identificador: value },
      select: { id: true },
    });
    return paquete === null;
  }

  public async findPaqueteWithDetails(
    id: number,
  ): Promise<Prisma.PaqueteGetPayload<{
    include: {
      orden: {
        include: {
          cabado: true;
          cliente: true;
          plan: true;
        };
      };
      estado: true;
      pieza: {
        include: {
          escuadria: true;
        };
      };
    };
  }> | null> {
    try {
      return await this.prisma.paquete.findUnique({
        where: {
          id,
        },
        include: {
          orden: {
            include: {
              cabado: true,
              cliente: true,
              plan: true,
            },
          },
          estado: true,
          pieza: {
            include: {
              escuadria: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async createPaquete(data: CreatePaqueteDto): Promise<Paquete | null> {
    try {
      return this.prisma.paquete.create({
        data,
      });
    } catch {
      return null;
    }
  }

  public async editEstado(data: EditPaqueteDto): Promise<Paquete | null> {
    try {
      return await this.prisma.paquete.update({
        where: { id: data.id },
        data: {
          estadoId: data.estadoId,
        },
      });
    } catch {
      return null;
    }
  }
}
