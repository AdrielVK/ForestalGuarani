import { Injectable } from '@nestjs/common';
import { RemitoRepository } from 'src/database/repository/remito.repository';
import { CreateRemitoDto } from 'src/dto/remito.dto';
import { IRemito } from 'src/interfaces/remito.interfaces';

@Injectable()
export class RemitoService {
  constructor(private readonly remitoRepository: RemitoRepository) {}

  public async createRemito(data: CreateRemitoDto): Promise<IRemito | null> {
    try {
      const remito = await this.remitoRepository.createRemito(data);

      if (!remito) return null;

      const response: IRemito = {
        id: remito.id,
        peso: remito.peso,
        fecha: remito.fecha,
      };

      return response;
    } catch {
      return null;
    }
  }
}
