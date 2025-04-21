import { Injectable } from '@nestjs/common';
import { ProveedorRepository } from 'src/database/repository/proveedor.repository';
import { IProveedor } from 'src/interfaces/proveedor.interface';

@Injectable()
export class ProveedorService {
  constructor(private readonly proveedorRepository: ProveedorRepository) {}

  public async getOrCreateProveedor(name: string): Promise<IProveedor> {
    try {
      const prov = await this.proveedorRepository.findByName(name);
      let response: IProveedor;

      if (!prov) {
        const newProv = await this.proveedorRepository.createProveedor({
          nombre: name,
        });

        response = {
          id: newProv.id,
          nombre: newProv.nombre,
        };

        return response;
      }

      response = {
        id: prov.id,
        nombre: prov.nombre,
      };

      return response;
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  }

  public async listProveedores(): Promise<IProveedor[]> {
    const response: IProveedor[] = [];

    const proveedores = await this.proveedorRepository.listProveedores();

    for (const prov of proveedores) {
      const newProv: IProveedor = {
        id: prov.id,
        nombre: prov.nombre,
      };

      response.push(newProv);
    }

    return response;
  }
}
