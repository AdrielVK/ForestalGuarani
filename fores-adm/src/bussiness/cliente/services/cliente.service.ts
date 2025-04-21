import { Injectable } from '@nestjs/common';
import { ClienteRepository } from 'src/database/repository/cliente.repository';
import { ICliente } from 'src/interfaces/cliente.interface';

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  public async getCliente(numero: string): Promise<ICliente | null> {
    try {
      const client = await this.clienteRepository.findClienteByNumero(numero);
      if (!client) {
        return null;
      }

      return {
        id: client.id,
        nombre: client.nombre,
        numero: client.numero,
      };
    } catch {
      return null;
    }
  }

  public async createCliente(
    numero: string,
    nombre: string,
  ): Promise<ICliente | null> {
    try {
      const newCliente = await this.clienteRepository.createCliente({
        numero: numero,
        nombre: nombre,
      });

      if (!newCliente) return null;

      return {
        id: newCliente.id,
        nombre: newCliente.nombre,
        numero: newCliente.numero,
      };
    } catch {
      return null;
    }
  }
}
