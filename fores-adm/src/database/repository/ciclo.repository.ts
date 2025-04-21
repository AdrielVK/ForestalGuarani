import { CicloSecado, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { AddEgresoCicloDto, CreateCicloDto } from 'src/dto/ciclo.dto';

@Injectable()
export class CicloRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<CicloSecado | null> {
    try {
      return await this.prisma.cicloSecado.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  public async deleteCiclo(id: number): Promise<CicloSecado | null> {
    try {
      return await this.prisma.cicloSecado.delete({ where: { id } });
    } catch {
      return null;
    }
  }

  public async listCicloSecadoDetails(): Promise<
    | Prisma.CicloSecadoGetPayload<{
        include: {
          paquete: {
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
          };
        };
      }>[]
    | null
    // eslint-disable-next-line indent
  > {
    try {
      return await this.prisma.cicloSecado.findMany({
        include: {
          paquete: {
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
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async getCicloSecadoDetails(
    id: number,
  ): Promise<Prisma.CicloSecadoGetPayload<{
    include: {
      paquete: {
        include: {
          orden: true;
          estado: true;
          pieza: {
            include: {
              escuadria: true;
            };
          };
        };
      };
    };
  }> | null> {
    // eslint-disable-next-line indent
    try {
      return await this.prisma.cicloSecado.findUnique({
        where: { id },
        include: {
          paquete: {
            include: {
              orden: true,
              estado: true,
              pieza: {
                include: {
                  escuadria: true,
                },
              },
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async setEgreso(data: AddEgresoCicloDto): Promise<CicloSecado | null> {
    try {
      return await this.prisma.cicloSecado.update({
        where: {
          id: data.id,
        },
        data: {
          egreso: data.egreso,
        },
      });
    } catch {
      return null;
    }
  }

  public async createCiclo(data: CreateCicloDto): Promise<CicloSecado | null> {
    try {
      return await this.prisma.cicloSecado.create({
        data,
      });
    } catch {
      return null;
    }
  }
}
