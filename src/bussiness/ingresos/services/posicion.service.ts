import { Injectable } from '@nestjs/common';
import { PosicionRepository } from 'src/database/repository/posicion.repository';
import { IPosicion, IPosicionStock } from 'src/interfaces/posicion.interface';

@Injectable()
export class PosicionService {
  constructor(private readonly posicionRepository: PosicionRepository) {}

  public async countPosiciones(): Promise<number | null> {
    try {
      return await this.posicionRepository.countOfPosicion();
    } catch {
      return null;
    }
  }

  public async findByEquipoId(equipoId: number): Promise<IPosicion | null> {
    try {
      const posicion = await this.posicionRepository.findByEquipoId(equipoId);
      return {
        id: posicion.id,
        identificador: posicion.identificador,
        ocupado: posicion.ocupado,
      };
    } catch {
      return null;
    }
  }

  public async setFreePosicion(id: number): Promise<IPosicion | null> {
    try {
      const posicion = await this.posicionRepository.setFreePosicion(id);

      return {
        id: posicion.id,
        identificador: posicion.identificador,
        ocupado: posicion.ocupado,
      };
    } catch {
      return null;
    }
  }

  public async deletePosicion(id: number): Promise<IPosicion | null> {
    const posicion = await this.posicionRepository.deletePosicion(id);
    if (!posicion) return null;
    return {
      id: posicion.id,
      identificador: posicion.identificador,
      ocupado: posicion.ocupado,
    };
  }

  public async createPosicion(identificador: number): Promise<IPosicion> {
    try {
      const posicion =
        await this.posicionRepository.createPosicion(identificador);
      return {
        id: posicion.id,
        identificador: posicion.identificador,
        ocupado: posicion.ocupado,
      };
    } catch {
      return null;
    }
  }

  public async listPosicionStock(): Promise<IPosicionStock[]> {
    try {
      const list = await this.posicionRepository.listStockByPosicion();
      if (!list) return null;

      return list.map((posicion) => ({
        id: posicion.id,
        identificador: posicion.identificador,
        ocupado: posicion.ocupado,
        equipo: {
          id: posicion.equipo.id,
          rolliso: {
            id: posicion.equipo.rolliso.id,
            diametro: posicion.equipo.rolliso.diametro,
            longitud: posicion.equipo.rolliso.longitud,
            tipo: posicion.equipo.rolliso.tipo,
          },
        },
      }));
    } catch {
      return null;
    }
  }

  public async listPosicion(): Promise<IPosicion[]> {
    try {
      const list = await this.posicionRepository.listOfPosicion();

      if (!list) return null;

      return list.map((posicion) => ({
        id: posicion.id,
        identificador: posicion.identificador,
        ocupado: posicion.ocupado,
      }));
    } catch {
      return null;
    }
  }

  public async associatePosicionToEquipo(
    posicionId: number,
    equipoId: number,
  ): Promise<IPosicion | null> {
    try {
      const posicion = await this.posicionRepository.associateEquipoToPosicion(
        equipoId,
        posicionId,
      );
      if (!posicion) return null;

      const response: IPosicion = {
        id: posicion.id,
        identificador: posicion.identificador,
        ocupado: posicion.ocupado,
      };

      return response;
    } catch {
      return null;
    }
  }

  public async obtainPosicion(
    identificador: number,
  ): Promise<IPosicion | null> {
    try {
      let posicion =
        await this.posicionRepository.findPosicionByIdentificador(
          identificador,
        );

      if (!posicion) {
        posicion = await this.posicionRepository.createPosicion(identificador);
      }

      const response: IPosicion = {
        id: posicion.id,
        identificador: posicion.identificador,
        ocupado: posicion.ocupado,
      };

      return response;
    } catch {
      return null;
    }
  }
}
