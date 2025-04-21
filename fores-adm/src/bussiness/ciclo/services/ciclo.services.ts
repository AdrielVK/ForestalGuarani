import { Injectable } from '@nestjs/common';
import { CicloRepository } from 'src/database/repository/ciclo.repository';
import { AddEgresoCicloDto, CreateCicloDto } from 'src/dto/ciclo.dto';
import { ICicloDetails } from 'src/interfaces/ciclo.interface';

@Injectable()
export class CicloService {
  constructor(private readonly cicloRepository: CicloRepository) {}

  public async createCiclo(
    data: CreateCicloDto,
  ): Promise<Omit<ICicloDetails, 'paquete'> | null> {
    try {
      return await this.cicloRepository.createCiclo(data);
    } catch {
      return null;
    }
  }

  public async deleteCiclo(id: number): Promise<string | null> {
    try {
      const deleted = await this.cicloRepository.deleteCiclo(id);

      if (!deleted) return null;

      return 'Eliminacion exitosa';
    } catch {
      return null;
    }
  }

  public async setEgreso(
    data: AddEgresoCicloDto,
  ): Promise<ICicloDetails | null> {
    try {
      return await this.cicloRepository.setEgreso(data);
    } catch {
      return null;
    }
  }

  public async listCicloDetails(): Promise<ICicloDetails[] | null> {
    try {
      const list = await this.cicloRepository.listCicloSecadoDetails();
      if (!list) return null;
      return list as ICicloDetails[];
    } catch {
      return null;
    }
  }
}
