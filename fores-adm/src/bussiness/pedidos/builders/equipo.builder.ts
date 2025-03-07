import { Injectable } from '@nestjs/common';
import { EquipoRepository } from 'src/database/repository/equipo.repository';
import { RollisoRepository } from 'src/database/repository/rolliso.repository';
import { CreateRollisoDto } from 'src/dto/rolliso.dto';
import { IEquipo } from 'src/interfaces/equipo.interface';
import { IRolliso } from 'src/interfaces/rolliso.interface';
import { CreateEquiposDto } from '../dto/request.dto';

class Equipo {
  equipo: IEquipo[];
}

@Injectable()
export class EquipoBuilder {
  private equipo: Equipo;

  constructor(
    private readonly equipoRepository: EquipoRepository,
    private readonly rollisoRepository: RollisoRepository,
  ) {
    this.equipo = new Equipo();
  }

  public async setRolliso(data: CreateRollisoDto): Promise<IRolliso> {
    const rolliso = await this.rollisoRepository.findByProps(data);

    if (!rolliso) {
      const newRolliso = await this.rollisoRepository.create(data);
      const response: IRolliso = {
        id: newRolliso.id,
        longitud: newRolliso.longitud,
        diametro: newRolliso.diametro,
        tipo: newRolliso.tipo,
      };

      return response;
    }

    const response: IRolliso = {
      id: rolliso.id,
      longitud: rolliso.longitud,
      diametro: rolliso.diametro,
      tipo: rolliso.tipo,
    };

    return response;
  }

  public async setEquipo(
    data: number | null,
  ): Promise<Omit<IEquipo, 'rolliso'>> {
    const equipo = await this.equipoRepository.createEquipo({ pedidoId: data });
    const response: Omit<IEquipo, 'rolliso'> = {
      id: equipo.id,
    };
    return response;
  }

  public async build(data: CreateEquiposDto): Promise<Equipo> {
    const equipos: IEquipo[] = [];

    for (const eq of data.rollisos) {
      for (let i = 0; i < eq.cantidad_equipos; i++) {
        const equipoBase = await this.setEquipo(data.pedidoId);

        const rollisoData: CreateRollisoDto = {
          tipo: eq.rolliso_tipo,
          diametro: eq.rolliso_diametro,
          longitud: eq.rolliso_longitud,
          //equipoId: equipoBase.id,
        };

        const rolliso = await this.setRolliso(rollisoData);
        console.log('rolliso');
        console.log(rolliso);
        console.log('rolliso');
        await this.equipoRepository.associateEquipoToRolliso(
          equipoBase.id,
          rolliso.id,
        );

        const newEquipo: IEquipo = {
          id: equipoBase.id,
          rolliso: {
            id: rolliso.id,
            diametro: rolliso.diametro,
            longitud: rolliso.longitud,
            tipo: rolliso.tipo,
          },
        };
        equipos.push(newEquipo);
      }
    }
    this.equipo.equipo = equipos;
    return this.equipo;
  }
}
