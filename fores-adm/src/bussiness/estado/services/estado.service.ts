import { Injectable } from '@nestjs/common';
import { EstadoRepository } from 'src/database/repository/estado.repository';
import { CreateEstadoDto } from 'src/dto/estado.dto';
import { IEstado } from 'src/interfaces/estado.interface';

@Injectable()
export class EstadoService {
  constructor(private readonly estadoRepository: EstadoRepository) {}

  public async createEstado(data: CreateEstadoDto): Promise<IEstado | null> {
    try {
      const estado = await this.estadoRepository.createPaquete(data);
      if (!estado) return null;

      return estado as IEstado;
    } catch {
      return null;
    }
  }
}
