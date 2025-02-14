import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRollisoDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  equipoId?: number;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  diametro: number;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  longitud: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tipo: string;
}

export class FindRollisoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  tipo: string;

  @ApiProperty()
  @IsDecimal()
  @IsOptional()
  diametro: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  longitud: number;
}

export class SetRollisoPosicionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  tipo: string;

  @ApiProperty()
  @IsDecimal()
  @IsOptional()
  diametro: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  longitud: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  posicion: number;
}
