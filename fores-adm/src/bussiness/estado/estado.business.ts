import { ResponseClass } from 'src/config/handless/response-class';
import { EstadoService } from './services/estado.service';
import { Injectable } from '@nestjs/common';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Injectable()
export class EstadoBusiness extends ResponseClass {
  constructor(private readonly estadoService: EstadoService) {
    super();
  }

  public async listOfValues(): Promise<ResponseInterface<string[]>> {
    try {
      const valueEstados = await this.estadoService.listOfValues();
      if (!valueEstados)
        return this.badRequest(
          'Error al obtener la lista de los valores de los estados',
        );
      return this.success(valueEstados);
    } catch {
      return this.badRequest(
        'Error al obtener la lista de los valores de los estados',
      );
    }
  }
}
