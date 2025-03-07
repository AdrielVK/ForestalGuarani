import { Injectable } from '@nestjs/common';
import { EsquemaRepository } from 'src/database/repository/esquema.repository';
import { FindEsquemaByProps } from 'src/dto/esquema.dto';
import { IEsquemaCorte } from 'src/interfaces/esquema.interface';

@Injectable()
export class EsquemaService {
  constructor(private readonly esquemaRepository: EsquemaRepository) {}

  public async getOrCreate(
    data: FindEsquemaByProps,
  ): Promise<IEsquemaCorte | null> {
    try {
      const esquema = await this.esquemaRepository.findByProps(data);
      if (!esquema) {
        const newEsquema = await this.esquemaRepository.createEsquema(data);
        if (!newEsquema) return null;
        return {
          id: newEsquema.id,
          longitud: newEsquema.longitud,
          ancho: newEsquema.ancho,
          espesor: newEsquema.espesor,
        };
      }
      return {
        id: esquema.id,
        longitud: esquema.longitud,
        ancho: esquema.ancho,
        espesor: esquema.espesor,
      };
    } catch {
      return null;
    }
  }
}
