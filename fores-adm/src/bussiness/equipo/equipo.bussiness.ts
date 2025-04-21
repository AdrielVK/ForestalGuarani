import { ResponseClass } from 'src/config/handless/response-class';
import { ResponseInterface } from 'src/interfaces/response.interface';

import { Injectable } from '@nestjs/common';
import { IEquipoStock } from 'src/interfaces/equipo.interface';
import { EquipoService } from '../ingresos/services/equipo.service';

@Injectable()
export class EquiposBussiness extends ResponseClass {
  constructor(private readonly equipoService: EquipoService) {
    super();
  }

  public async listEquipoStock(): Promise<ResponseInterface<IEquipoStock[]>> {
    try {
      const equipos = await this.equipoService.listEquipoStock();
      if (!equipos)
        return this.badRequest('Error al intentar obtener el stock de equipos');
      return this.success(equipos);
    } catch {
      return this.badRequest(
        'Error al intentar obtener la lista de posiciones',
      );
    }
  }
}
