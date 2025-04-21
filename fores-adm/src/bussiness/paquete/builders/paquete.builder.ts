import { Injectable } from '@nestjs/common';
import { EscuadriaService } from 'src/bussiness/escuadria/escuadria.service';
import { EstadoService } from 'src/bussiness/estado/services/estado.service';
import { PiezaService } from 'src/bussiness/pieza/pieza.service';
import { PaqueteService } from '../service/paquete.service';
import { CreateEstadoDto } from 'src/dto/estado.dto';
import { CreateEscuadriaDto } from 'src/dto/escuadria.dto';
import { CreatePiezaDto } from 'src/dto/pieza.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { CreatePaqueteBuilderDto, CreatePaqueteDto } from 'src/dto/paquete.dto';

class Estado {
  id: number;
  value: string;
}

class Pieza {
  id: number;
  volumen: Decimal;
  espesor: Decimal;
  longitud: Decimal;
  ancho: Decimal;
  escuadria?: Escuadria | null;
}

class Escuadria {
  id: number;
  longitud: Decimal;
  altura: Decimal;
  ancho: Decimal;
}

class Paquete {
  id: number | null;
  identificador: string | null;
  vol: Decimal | null;
  pieza: Pieza | null;
  estado: Estado | null;
  ingreso: Date | null;
  ordenId: number | null;
}

@Injectable()
export class PaqueteBuilder {
  private paquete: Paquete;

  constructor(
    private readonly estadoService: EstadoService,
    private readonly escuadriaService: EscuadriaService,
    private readonly piezaService: PiezaService,
    private readonly paqueteService: PaqueteService,
  ) {
    this.paquete = {
      id: null,
      identificador: null,
      vol: null,
      pieza: null,
      estado: null,
      ingreso: null,
      ordenId: null,
    };
  }

  public async setEstado(data: CreateEstadoDto): Promise<PaqueteBuilder> {
    try {
      const newEstado = await this.estadoService.createEstado(data);

      if (!newEstado) this.paquete.estado = null;

      this.paquete.estado = newEstado;
    } catch {
      this.paquete.estado = null;
    } finally {
      return this;
    }
  }

  public async setPiezaEscuadria(data: {
    escuadria: CreateEscuadriaDto;
    pieza: CreatePiezaDto;
  }): Promise<PaqueteBuilder> {
    try {
      const escuadria = await this.escuadriaService.getOrCreate(data.escuadria);

      let dataToCreatePieza = {
        ...data.pieza,
      };

      if (escuadria) {
        dataToCreatePieza = {
          ...dataToCreatePieza,
          escuadriaId: escuadria.id,
        };
      }

      const pieza = await this.piezaService.createPieza(dataToCreatePieza);

      if (pieza) {
        this.paquete.pieza = {
          id: pieza.id,
          volumen: pieza.volumen,
          espesor: pieza.espesor,
          longitud: pieza.longitud,
          ancho: pieza.ancho,
        };

        if (escuadria) {
          this.paquete.pieza.escuadria = {
            id: escuadria.id,
            longitud: escuadria.longitud,
            altura: escuadria.altura,
            ancho: escuadria.ancho,
          };
        }
      }
    } catch {
      this.paquete.pieza = null;
    } finally {
      return this;
    }
  }

  public async setPaquete(
    data: CreatePaqueteBuilderDto,
  ): Promise<PaqueteBuilder> {
    try {
      const paqueteData: CreatePaqueteDto = {
        ...data,
        estadoId: this.paquete.estado.id,
        piezaId: this.paquete.pieza.id,
      };

      const paquete = await this.paqueteService.createPaquete(paqueteData);

      if (paquete) {
        this.paquete = {
          ...this.paquete,
          id: paquete.id,
          identificador: paquete.identificador,
          vol: paquete.vol,
        };
      } else {
        this.paquete = {
          ...this.paquete,
          id: null,
          identificador: null,
          vol: null,
        };
      }
    } catch {
      this.paquete = {
        ...this.paquete,
        id: null,
        identificador: null,
        vol: null,
      };
    } finally {
      return this;
    }
  }

  public async build(): Promise<Paquete> {
    return this.paquete;
  }
}
