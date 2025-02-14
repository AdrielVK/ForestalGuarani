import { Injectable } from '@nestjs/common';
import { ResponseClass } from 'src/config/handless/response-class';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { ProveedorService } from './services/proveedor.service';
import { IProveedor } from 'src/interfaces/proveedor.interface';

@Injectable()
export class ProveedorBussiness extends ResponseClass {
  constructor(private readonly proveedorService: ProveedorService) {
    super();
  }

  public async listProveedores(): Promise<ResponseInterface<IProveedor[]>> {
    const response = await this.proveedorService.listProveedores();
    return this.success(response);
  }
}
