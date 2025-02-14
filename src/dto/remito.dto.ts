/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRemitoDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  fecha: Date;
  @IsNumber()
  @IsNotEmpty()
  peso: number;
}
