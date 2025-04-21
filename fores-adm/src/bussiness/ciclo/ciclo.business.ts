import { ResponseClass } from 'src/config/handless/response-class';
import { CicloService } from './services/ciclo.services';
import { AddEgresoCicloDto, CreateCicloDto } from 'src/dto/ciclo.dto';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { ICicloDetails } from 'src/interfaces/ciclo.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CicloBusiness extends ResponseClass {
  constructor(private readonly cicloService: CicloService) {
    super();
  }

  public async setEgreso(
    data: AddEgresoCicloDto,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const updatedCiclo = await this.cicloService.setEgreso(data);

      if (!updatedCiclo)
        return this.badRequest(
          'Error al agregar una fecha de egreso al ciclo de secado',
        );

      return this.success({ message: 'Egreso agregado exitosamente' });
    } catch {
      return this.badRequest(
        'Error al agregar una fecha de egreso al ciclo de secado',
      );
    }
  }

  public async createCiclo(
    data: CreateCicloDto,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const newCiclo = await this.cicloService.createCiclo(data);
      if (!newCiclo)
        return this.badRequest('Error al crear un ciclo de secado');

      return this.success({ message: 'Ciclo creado' });
    } catch {
      return this.badRequest('Error al crear un ciclo de secado');
    }
  }

  public async deleteCiclo(
    id: number,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const response = await this.cicloService.deleteCiclo(id);

      if (!response)
        return this.badRequest('Error al intentar eliminar el ciclo de secado');

      return this.success({ message: response });
    } catch {
      return this.badRequest('Error al intentar eliminar el ciclo de secado');
    }
  }

  public async listCiclos(): Promise<ResponseInterface<ICicloDetails[]>> {
    try {
      const response = await this.cicloService.listCicloDetails();
      if (!response)
        return this.badRequest(
          'Error al intentar obtener la lista de ciclos de secado',
        );

      return this.success(response);
    } catch {
      return this.badRequest(
        'Error al intentar obtener la lista de ciclos de secado',
      );
    }
  }
}
