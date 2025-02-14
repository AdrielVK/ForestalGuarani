/* eslint-disable indent */
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SetRollisoPosicionDto } from './rolliso.dto';
import { Transform } from 'class-transformer';

export class CreateCompleteIngresoDto {
  @IsNotEmpty()
  @IsString()
  proveedorName: string;

  @IsNotEmpty()
  @IsBoolean()
  fuente_controlada: boolean;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  chofer: string;

  @IsNotEmpty()
  @IsString()
  patente: string;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsArray()
  equipos: SetRollisoPosicionDto[];
}

export class CreateIngresoDBDto {
  @IsNotEmpty()
  @IsNumber()
  proveedorId: number;

  @IsNotEmpty()
  @IsBoolean()
  fuente_controlada: boolean;

  @IsNotEmpty()
  @IsDate()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  chofer: string;

  @IsNotEmpty()
  @IsString()
  patente: string;

  @IsNotEmpty()
  @IsNumber()
  remitoId: number;
}

export class CreateIngresoEntityDto {
  @IsOptional()
  @IsNumber()
  proveedorId?: number;

  @IsNotEmpty()
  @IsBoolean()
  fuente_controlada: boolean;

  @IsNotEmpty()
  @IsDate()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  chofer: string;

  @IsNotEmpty()
  @IsString()
  patente: string;

  @IsOptional()
  @IsNumber()
  remitoId?: number;
}
