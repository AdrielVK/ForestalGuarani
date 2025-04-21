import { ApiProperty } from '@nestjs/swagger';
import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
/* eslint-disable indent */
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

@Injectable()
export class ValidarIdentificadorPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new BadRequestException(
        'El identificador debe ser un string válido',
      );
    }
    return value.trim();
  }
}

export class EditPaqueteDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  estadoId: number;
}

export class EditPaqueteRequestDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  estadoValue: string;
}

export class CreatePaqueteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identificador: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vol: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  estadoId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  piezaId: number;

  @IsOptional()
  @IsDate()
  ingreso?: Date;

  @IsOptional()
  @IsNumber()
  ordenId?: number;
}

export class CreatePaqueteBuilderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identificador: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vol: number;

  @IsOptional()
  @IsDate()
  ingreso?: Date;

  @IsOptional()
  @IsNumber()
  ordenId?: number;
}

export class CreateCompletePaqueteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identificador: string;

  @IsOptional()
  @IsNumber()
  ordenId?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vol: number;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  ingreso?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  valueEstado: string;

  @IsNumber()
  @IsOptional()
  alturaEscuadria?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  longitudEscuadria?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  anchoEscuadria?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  volumenPieza: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  espesorPieza: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  longitudPieza: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  anchoPieza: number;
}
