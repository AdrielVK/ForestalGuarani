import { Injectable } from '@nestjs/common';
import { EstadoRepository } from 'src/database/repository/estado.repository';
import { CreateEstadoDto } from 'src/dto/estado.dto';
import { IEstado } from 'src/interfaces/estado.interface';

@Injectable()
export class EstadoService {
  constructor(private readonly estadoRepository: EstadoRepository) {}

  public async listOfValues(): Promise<string[] | null> {
    try {
      return await this.estadoRepository.listOfValues();
    } catch {
      return null;
    }
  }

  public async createEstado(data: CreateEstadoDto): Promise<IEstado | null> {
    try {
      const estado = await this.estadoRepository.findByValue(data.value);
      if (!estado) {
        const newEstado = await this.estadoRepository.createEstado(data);
        if (!newEstado) return null;

        return newEstado as IEstado;
      }
      return estado as IEstado;
    } catch {
      return null;
    }
  }
}
