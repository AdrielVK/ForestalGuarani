import { BussinessModule } from './../bussiness/bussiness.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PedidoController } from './pedido.controller';
import { ProveedorController } from './proveedor.controller';
import { IngresosController } from './ingresos.controller';
import { PosicionController } from './posicion.controller';
import { EquipoController } from './equipo.controller';
import { OrdenController } from './orden.controller';
import { PlanController } from './plan.controller';
import { ConsumoController } from './consumo.controller';
import { PaqueteController } from './paquete.controller';
import { CicloController } from './ciclo.controller';
import { EstadoController } from './estado.controller';

@Module({
  imports: [BussinessModule],
  controllers: [
    AuthController,
    OrdenController,
    PedidoController,
    ProveedorController,
    IngresosController,
    PosicionController,
    EquipoController,
    PlanController,
    ConsumoController,
    PaqueteController,
    CicloController,
    EstadoController,
  ],
})
export class ApplicationModule {}
