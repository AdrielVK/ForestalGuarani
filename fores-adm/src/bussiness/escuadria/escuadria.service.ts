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
      const escuadria = await this.escuadriaRepository.finByProps(data);
      if (!escuadria) {
        const newEscuadria =
          await this.escuadriaRepository.createEscuadria(data);
        if (!newEscuadria) return null;
        return {
          id: newEscuadria.id,
          longitud: newEscuadria.longitud,
          altura: newEscuadria.altura,
          ancho: newEscuadria.ancho,
        };
      } else {
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
