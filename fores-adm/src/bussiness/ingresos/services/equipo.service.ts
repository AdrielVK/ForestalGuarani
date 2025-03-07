import { Injectable } from '@nestjs/common';
import { EquipoBuilder } from 'src/bussiness/pedidos/builders/equipo.builder';
import { EquipoRepository } from 'src/database/repository/equipo.repository';
import { FindRollisoDto } from 'src/dto/rolliso.dto';
import { IEquipo, IEquipoStock } from 'src/interfaces/equipo.interface';

@Injectable()
export class EquipoService {
  constructor(
    private readonly equipoBuilder: EquipoBuilder,
    private readonly equipoRepository: EquipoRepository,
  ) {}

  public async listEquipoStock(): Promise<IEquipoStock[]> {
    try {
      const list = await this.equipoRepository.listEquiposStock();
      console.log('list', list);
      if (!list) return null;

      return list.map((equipo) => ({
        id: equipo.id,
        rolliso: {
          id: equipo.rolliso.id,
          longitud: equipo.rolliso.longitud,
          diametro: equipo.rolliso.diametro,
          tipo: equipo.rolliso.tipo,
        },
        posicion: {
          id: equipo.posicion.id,
          identificador: equipo.posicion.identificador,
          ocupado: equipo.posicion.ocupado,
        },
      }));
    } catch {
      return null;
    }
  }

  public async associateEquipoToIngreso(
    equipoId: number,
    ingresoId: number,
  ): Promise<Omit<IEquipo, 'rolliso'> | null> {
    try {
      const equipo = await this.equipoRepository.associateEquipoToIngreso(
        equipoId,
        ingresoId,
      );
      return { id: equipo.id };
    } catch {
      return null;
    }
  }

  public async obtainEquipo(data: FindRollisoDto): Promise<IEquipo | null> {
    try {
      const rolliso = await this.equipoBuilder.setRolliso(data);

      let equipo = await this.equipoRepository.findByRolliso(rolliso.id);

      if (!equipo) {
        equipo = await this.equipoRepository.createEquipo({});
        await this.equipoRepository.associateEquipoToRolliso(
          equipo.id,
          rolliso.id,
        );
      }

      const response: IEquipo = {
        id: equipo.id,
        rolliso: {
          id: rolliso.id,
          diametro: rolliso.diametro,
          longitud: rolliso.longitud,
          tipo: rolliso.tipo,
        },
      };

      return response;
    } catch {
      return null;
    }
  }
}
