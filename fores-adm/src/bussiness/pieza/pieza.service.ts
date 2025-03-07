import { Injectable } from '@nestjs/common';
import { PiezaRepository } from 'src/database/repository/pieza.repository';
import { CreatePiezaDto } from 'src/dto/pieza.dto';
import { IPieza } from 'src/interfaces/pieza.interface';

@Injectable()
export class PiezaService {
  constructor(private readonly piezaRepository: PiezaRepository) {}

  public async createPieza(data: CreatePiezaDto): Promise<IPieza | null> {
    try {
      const pieza = await this.piezaRepository.createPieza(data);
      if (!pieza) return null;
      return pieza as IPieza;
    } catch {
      return null;
    }
  }
}
