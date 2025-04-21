import { Injectable } from '@nestjs/common';
import { PaqueteRepository } from 'src/database/repository/paquete.repository';
import { CreatePaqueteDto, EditPaqueteDto } from 'src/dto/paquete.dto';
import {
  IPaquete,
  IPaqueteDetails,
  IPaqueteForCiclo,
  IPaqueteReducedDetails,
} from 'src/interfaces/paquete.interface';

@Injectable()
export class PaqueteService {
  constructor(private readonly paqueteRepository: PaqueteRepository) {}

  public async createPaquete(data: CreatePaqueteDto): Promise<IPaquete | null> {
    try {
      const paquete = await this.paqueteRepository.createPaquete(data);
      if (!paquete) return null;
      return paquete as IPaquete;
    } catch {
      return null;
    }
  }

  public async editEstadoPaquete(
    data: EditPaqueteDto,
  ): Promise<IPaqueteDetails | null> {
    try {
      const paquete = await this.paqueteRepository.editEstado(data);

      if (!paquete) return null;

      return paquete as IPaqueteDetails;
    } catch {
      return null;
    }
  }

  public async existsIdentificador(value: string): Promise<boolean> {
    return await this.paqueteRepository.existsIdentificador(value);
  }

  public async getPaqueteDetail(id: number): Promise<IPaqueteDetails | null> {
    try {
      const paqueteDetails =
        await this.paqueteRepository.findPaqueteWithDetails(id);

      if (!paqueteDetails) return null;
      return paqueteDetails as IPaqueteDetails;
    } catch {
      return null;
    }
  }

  public async listPaquetesWithoutOrden(): Promise<
    IPaqueteReducedDetails[] | null
    // eslint-disable-next-line indent
  > {
    try {
      const list = await this.paqueteRepository.listPaquetesWithoutOrden();

      if (!list) return null;

      return list as IPaqueteReducedDetails[];
    } catch {
      return null;
    }
  }

  public async listPaquetesWithoutCiclo(): Promise<
    IPaqueteForCiclo[] | null
    // eslint-disable-next-line indent
  > {
    try {
      const list = await this.paqueteRepository.listPaquetesWithoutCiclo();

      if (!list) return null;

      return list as IPaqueteForCiclo[];
    } catch {
      return null;
    }
  }

  public async listPaquete(): Promise<IPaqueteDetails[] | null> {
    try {
      const list = await this.paqueteRepository.listPaquetes();

      if (!list) return null;

      return list as IPaqueteDetails[];
    } catch {
      return null;
    }
  }

  public async deletePaquete(id: number): Promise<IPaquete | null> {
    try {
      return await this.paqueteRepository.deletePaquete(id);
    } catch {
      return null;
    }
  }
}
