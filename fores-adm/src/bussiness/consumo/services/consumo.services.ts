import { AssociateConsumoToPlanDto } from './../../../dto/plan.dto';
import { Injectable } from '@nestjs/common';
import { ConsumoRepository } from 'src/database/repository/consumo.repository';
import { CreateConsumoEntityDto } from 'src/dto/consumo.dto';
import { IConsumo } from 'src/interfaces/consumo.interface';

@Injectable()
export class ConsumoService {
  constructor(private readonly consumoRepository: ConsumoRepository) {}

  public async associateConsumoToPlan(
    data: AssociateConsumoToPlanDto,
  ): Promise<Omit<IConsumo, 'plan'> | null> {
    try {
      return await this.consumoRepository.associateConsumoToPlan(data);
    } catch {
      return null;
    }
  }

  public async create(
    data: CreateConsumoEntityDto,
  ): Promise<Omit<IConsumo, 'plan'> | null> {
    try {
      const newConsumo = await this.consumoRepository.create(data);

      if (!newConsumo) return null;

      const response = await this.consumoRepository.findById(newConsumo.id);

      return response;
    } catch {
      return null;
    }
  }
}
