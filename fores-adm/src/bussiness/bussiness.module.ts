import { IngresosBussiness } from 'src/bussiness/ingresos/ingresos.bussines';
import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AuthBussiness } from './auth/auth.bussiness';
import { ConfigService } from '@nestjs/config';
import { jwtFactory } from 'src/config/factories/jwt.factory';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { PedidosBussiness } from './pedidos/pedidos.bussines';
import { PedidoBuilder } from './pedidos/builders/pedido.builder';
import { EquipoBuilder } from './pedidos/builders/equipo.builder';
import { PedidoService } from './pedidos/services/pedido.service';
import { ProveedorService } from './proveedor/services/proveedor.service';
import { ProveedorBussiness } from './proveedor/proveedor.bussines';
import { AuthService } from './auth/auth.services';
import { IngresosService } from './ingresos/services/ingresos.service';
import { PosicionService } from './ingresos/services/posicion.service';
import { EquipoService } from './ingresos/services/equipo.service';
import { RemitoService } from './ingresos/services/remito.service';
import { IngresoBuilder } from './ingresos/builders/ingresos.builder';
import { PosicionBussiness } from './posicion/posicion.bussines';
import { EquiposBussiness } from './equipo/equipo.bussiness';
import { CabadoService } from './cabado/services/cabado.service';
import { ClienteService } from './cliente/services/cliente.service';
import { OrdenService } from './orden/services/orden.service';
import { OrdenBussiness } from './orden/orden.bussines';
import { OrdenBuilder } from './orden/builders/orden.builder';
import { EsquemaService } from './esquema_corte/services/esquema.service';
import { PlanService } from './plan_produccion/services/plan.service';
import { PlanBuilder } from './plan_produccion/builders/plan.builder';
import { PlanBussiness } from './plan_produccion/plan.bussines';
import { ConsumoService } from './consumo/services/consumo.services';
import { ConsumoBussiness } from './consumo/consumo.bussiness';

const providers: Provider<any>[] = [
  AuthBussiness,
  PedidosBussiness,
  JwtStrategy,
  PedidoBuilder,
  EquipoBuilder,
  PedidoService,
  ProveedorService,
  ProveedorBussiness,
  AuthService,
  IngresosBussiness,
  IngresosService,
  PosicionService,
  EquipoService,
  RemitoService,
  IngresoBuilder,
  PosicionService,
  PosicionBussiness,
  EquiposBussiness,
  CabadoService,
  ClienteService,
  OrdenService,
  OrdenBussiness,
  OrdenBuilder,
  EsquemaService,
  PlanService,
  PlanBuilder,
  PlanBussiness,
  ConsumoService,
  ConsumoBussiness,
];

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class BussinessModule {}
