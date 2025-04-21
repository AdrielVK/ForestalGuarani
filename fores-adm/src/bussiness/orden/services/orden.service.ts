import { Injectable } from '@nestjs/common';
import { OrdenRepository } from 'src/database/repository/orden.repository';
import { CreateOrdenProdDto } from 'src/dto/orden.dto';
import { IOrden } from 'src/interfaces/orden.interface';

@Injectable()
export class OrdenService {
  constructor(private readonly ordenRepository: OrdenRepository) {}

  public async listOrdenesFree(): Promise<IOrden[] | null> {
    try {
      return await this.ordenRepository.listOrdenesFree();
    } catch {
      return null;
    }
  }

  public async listOrdenesFreeOfPaquete(): Promise<IOrden[] | null> {
    try {
      return await this.ordenRepository.listOrdenesFreeOfPaquete();
    } catch {
      return null;
    }
  }

  public async listOrdenes(): Promise<IOrden[] | null> {
    try {
      return await this.ordenRepository.listOrdenes();
    } catch {
      return null;
    }
  }

  public async associateOrdenes(
    planId: number,
    ordenId: number,
  ): Promise<IOrden | null> {
    try {
      const obj = await this.ordenRepository.associateOrdenToPlan(
        planId,
        ordenId,
      );

      if (!obj) return null;

      return await this.ordenRepository.detailOrden(obj.id);
    } catch {
      return null;
    }
  }

  public async deleteOrden(id: number): Promise<string | null> {
    return this.ordenRepository.deleteOrden(id);
  }

  public async createOrden(
    data: CreateOrdenProdDto,
  ): Promise<Omit<IOrden, 'cliente' | 'cabado'> | null> {
    try {
      const newOrden = await this.ordenRepository.createOrden(data);
      if (!newOrden) return null;

      /*const detailNewOrden = await this.ordenRepository.detailOrden(
        newOrden.id,
      );

      if (!detailNewOrden) return null;

      return detailNewOrden as IOrden;*/

      return newOrden as Omit<IOrden, 'cliente' | 'cabado'>;
    } catch {
      return null;
    }
  }
}
