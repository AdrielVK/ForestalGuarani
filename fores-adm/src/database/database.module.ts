import { Module } from '@nestjs/common';
import { Prisma } from './prisma';
import { UserRepository } from './repository/user.repository';
import { EquipoRepository } from './repository/equipo.repository';
import { PedidoRepository } from './repository/pedido.repository';
import { ProveedorRepository } from './repository/proveedor.repository';
import { RollisoRepository } from './repository/rolliso.repository';
import { IngresoRepository } from './repository/ingreso.repository';
import { PosicionRepository } from './repository/posicion.repository';
import { RemitoRepository } from './repository/remito.repository';
import { CabadoRepository } from './repository/cabado.repository';
import { OrdenRepository } from './repository/orden.repository';
import { ClienteRepository } from './repository/cliente.repository';
import { EsquemaRepository } from './repository/esquema.repository';
import { PlanRepository } from './repository/plan.repository';
import { ConsumoRepository } from './repository/consumo.repository';
import { EstadoRepository } from './repository/estado.repository';
import { EscuadriaRepository } from './repository/escuadria.repository';
import { PiezaRepository } from './repository/pieza.repository';
import { PaqueteRepository } from './repository/paquete.repository';
import { CicloRepository } from './repository/ciclo.repository';

const provider = [
  Prisma,
  UserRepository,
  EquipoRepository,
  PedidoRepository,
  ProveedorRepository,
  RollisoRepository,
  EquipoRepository,
  IngresoRepository,
  PosicionRepository,
  RemitoRepository,
  CabadoRepository,
  OrdenRepository,
  ClienteRepository,
  EsquemaRepository,
  PlanRepository,
  ConsumoRepository,

  EstadoRepository,
  EscuadriaRepository,
  PiezaRepository,
  PaqueteRepository,

  CicloRepository,
];

@Module({
  providers: provider,
  exports: provider,
})
export class DatabaseModule {}
