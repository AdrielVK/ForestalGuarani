import { ResponseClass } from 'src/config/handless/response-class';
import { PaqueteBuilder } from './builders/paquete.builder';
import {
  IPaqueteDetails,
  IPaqueteForCiclo,
  IPaqueteReducedDetails,
} from 'src/interfaces/paquete.interface';
import {
  CreateCompletePaqueteDto,
  CreatePaqueteBuilderDto,
  EditPaqueteRequestDto,
} from 'src/dto/paquete.dto';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { PaqueteService } from './service/paquete.service';
import { EstadoService } from '../estado/services/estado.service';

@Injectable()
export class PaqueteBussiness extends ResponseClass {
  constructor(
    private readonly paqueteBuilder: PaqueteBuilder,
    private readonly paqueteService: PaqueteService,
    private readonly estadoService: EstadoService,
  ) {
    super();
  }

  public async existsIdentificador(
    value: string,
  ): Promise<ResponseInterface<boolean>> {
    const result = await this.paqueteService.existsIdentificador(value);
    return this.success(result);
  }

  public async createPaquete(
    data: CreateCompletePaqueteDto,
  ): Promise<
    ResponseInterface<{ message: string; response: IPaqueteDetails }>
  > {
    try {
      const estadoData = {
        value: data.valueEstado,
      };

      await this.paqueteBuilder.setEstado(estadoData);

      const escuadriaData = {
        altura: data.alturaEscuadria ?? null,
        longitud: data.longitudEscuadria ?? null,
        ancho: data.anchoEscuadria ?? null,
      };

      const piezaData = {
        volumen: data.volumenPieza,
        espesor: data.espesorPieza,
        longitud: data.longitudPieza,
        ancho: data.anchoPieza,
      };

      await this.paqueteBuilder.setPiezaEscuadria({
        escuadria: escuadriaData,
        pieza: piezaData,
      });

      const paqueteData: CreatePaqueteBuilderDto = {
        identificador: data.identificador,
        vol: data.vol,
        ordenId: data.ordenId,
      };

      await this.paqueteBuilder.setPaquete(paqueteData);

      const newPaquete = await this.paqueteBuilder.build();

      if (
        newPaquete.id === null ||
        newPaquete.estado === null ||
        newPaquete.pieza === null
      ) {
        return this.badRequest(
          'Error al intentar crear un paquete para empalilladora',
        );
      }

      return this.success({
        message: 'Paquete creado con exito',
        response: newPaquete,
      });
    } catch {
      return this.badRequest(
        'Error al intentar crear un paquete para empalilladora',
      );
    }
  }

  public async getPaqueteDetails(
    id: number,
  ): Promise<ResponseInterface<IPaqueteDetails>> {
    try {
      const response = await this.paqueteService.getPaqueteDetail(id);
      if (!response)
        return this.badRequest(
          'Error al intentar obtener el detalle del paquete',
        );
      return this.success(response);
    } catch {
      return this.badRequest(
        'Error al intentar obtener el detalle del paquete',
      );
    }
  }

  public async listPaquetes(): Promise<
    ResponseInterface<IPaqueteDetails[]>
    // eslint-disable-next-line indent
  > {
    try {
      const response = await this.paqueteService.listPaquete();
      if (!response)
        return this.badRequest(
          'Error al intentar obtener la lista de paquetes',
        );
      return this.success(response);
    } catch {
      return this.badRequest(
        'Error al intentar obtener el detalle del paquete',
      );
    }
  }

  public async deletePaquete(
    id: number,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const res = await this.paqueteService.deletePaquete(id);

      if (!res) return this.badRequest('Error al eliminar el paquete');

      return this.success({ message: 'Eliminacion exitosa' });
    } catch {
      return this.badRequest('Error al eliminar el paquete');
    }
  }

  public async listPaquetesFree(): Promise<
    ResponseInterface<IPaqueteReducedDetails[]>
    // eslint-disable-next-line indent
  > {
    try {
      const response = await this.paqueteService.listPaquetesWithoutOrden();
      if (!response)
        return this.badRequest(
          'Error al intentar obtener la lista de paquetes',
        );
      return this.success(response);
    } catch {
      return this.badRequest(
        'Error al intentar obtener el detalle del paquete',
      );
    }
  }

  public async editEstadoPaquete(
    data: EditPaqueteRequestDto,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const newEstado = await this.estadoService.createEstado({
        value: data.estadoValue,
      });

      if (!newEstado) return this.badRequest('Error, estado inexistente');

      const actPaquete = await this.paqueteService.editEstadoPaquete({
        id: data.id,
        estadoId: newEstado.id,
      });

      if (!actPaquete)
        return this.badRequest('Error al intentar actualizar el paquete');

      return this.success({ message: 'Cambio de estado exitoso' });
    } catch {
      return this.badRequest('Error al intentar cambiar el estado');
    }
  }

  public async listPaquetesFreeOfCiclo(): Promise<
    ResponseInterface<IPaqueteForCiclo[]>
    // eslint-disable-next-line indent
  > {
    try {
      const response = await this.paqueteService.listPaquetesWithoutCiclo();
      if (!response)
        return this.badRequest(
          'Error al intentar obtener la lista de paquetes',
        );
      return this.success(response);
    } catch {
      return this.badRequest(
        'Error al intentar obtener el detalle del paquete',
      );
    }
  }
}
