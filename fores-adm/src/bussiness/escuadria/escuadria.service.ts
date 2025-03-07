import { Injectable } from '@nestjs/common';
import { EscuadriaRepository } from 'src/database/repository/escuadria.repository';
import { FindByPropsEscuadriaDto } from 'src/dto/escuadria.dto';
import { IEscuadria } from 'src/interfaces/escuadria.interface';

@Injectable()
export class EscuadriaService {
  constructor(private readonly escuadriaRepository: EscuadriaRepository) {}

  public async getOrCreate(
    data: FindByPropsEscuadriaDto,
  ): Promise<IEscuadria | null> {
    try {
      let escuadria = await this.escuadriaRepository.finByProps(data);
      if (!escuadria) {
        escuadria = await this.escuadriaRepository.finByProps(data);
        if (!escuadria) return null;
        return {
          id: escuadria.id,
          longitud: escuadria.longitud,
          altura: escuadria.altura,
          ancho: escuadria.ancho,
        };
      }
    } catch {
      return null;
    }
  }
}
