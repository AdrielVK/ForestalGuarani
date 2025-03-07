import { Injectable } from '@nestjs/common';
import { CabadoRepository } from 'src/database/repository/cabado.repository';
import { ICabado } from 'src/interfaces/cabado.interface';

@Injectable()
export class CabadoService {
  constructor(private readonly cabadoRepository: CabadoRepository) {}

  public async getOrCreate(nombre: string): Promise<ICabado | null> {
    try {
      const cabado = await this.cabadoRepository.findCabadoByNombre(nombre);

      if (!cabado) {
        const newCabado = await this.cabadoRepository.createCabado(nombre);
        if (!newCabado) return null;

        return {
          id: newCabado.id,
          nombre: newCabado.nombre,
        };
      }

      return {
        id: cabado.id,
        nombre: cabado.nombre,
      };
    } catch {
      return null;
    }
  }
}
