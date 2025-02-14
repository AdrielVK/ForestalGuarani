import { Get, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/bussiness/auth/jwt.guard';
import { ProveedorBussiness } from 'src/bussiness/proveedor/proveedor.bussines';
import { IProveedor } from 'src/interfaces/proveedor.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('proveedor')
export class ProveedorController {
  constructor(private proveedorBussiness: ProveedorBussiness) {}

  @Get('list')
  @UseGuards(JwtAuthGuard)
  public async listProveedores(): Promise<ResponseInterface<IProveedor[]>> {
    return await this.proveedorBussiness.listProveedores();
  }
}
