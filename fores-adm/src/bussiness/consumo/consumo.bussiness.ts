import { ResponseClass } from 'src/config/handless/response-class';
import { ConsumoService } from './services/consumo.services';
import { CreateConsumoEntityDto } from 'src/dto/consumo.dto';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { IConsumo } from 'src/interfaces/consumo.interface';
import { Injectable } from '@nestjs/common';
import { PosicionService } from '../ingresos/services/posicion.service';

@Injectable()
export class ConsumoBussiness extends ResponseClass {
  constructor(
    private readonly consumoService: ConsumoService,
    private readonly posicionService: PosicionService,
  ) {
    super();
  }

  public async createConsumo(
    data: CreateConsumoEntityDto,
  ): Promise<
    ResponseInterface<{ response: Omit<IConsumo, 'plan'>; message: string }>
  > {
    try {
      const newConsumo = await this.consumoService.create(data);
      if (!newConsumo) return this.badRequest('Error al crear consumo');

      const dataAssociate = {
        planId: data.planId,
        consumoId: newConsumo.id,
      };

      const response =
        await this.consumoService.associateConsumoToPlan(dataAssociate);
      const positionToConsume = await this.posicionService.findByEquipoId(
        newConsumo.equipo.id,
      );

      if (!positionToConsume) {
        return this.badRequest('Error al obtner la posicion a consumir');
      }

      const consume = await this.posicionService.setFreePosicion(
        positionToConsume.id,
      );

      if (!consume) {
        return this.badRequest('Error al intentar consumir la posicion');
      }

      return this.success({
        response: response,
        message: 'Consumo registrado',
      });
    } catch {
      return this.badRequest('Error al crear consumo');
    }
  }
}
