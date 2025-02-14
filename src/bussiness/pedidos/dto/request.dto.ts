/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class RollisoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rolliso_tipo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  rolliso_longitud: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  rolliso_diametro: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cantidad_equipos: number;
}

export class CreateEquiposDto {
  pedidoId?: number;
  rollisos: RollisoDto[];
}

export class CreatePedidoRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  proveedor_nombre: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  pedido_fecha?: Date;

  @ApiProperty()
  @IsArray()
  rollisos: RollisoDto[];
}
