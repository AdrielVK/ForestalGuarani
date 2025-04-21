import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ROLE } from 'src/interfaces/auth.interface';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class EditPasswordRequestControllerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class EditPasswordRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @IsNumber()
  reqUserId: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class EditPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ChangeRoleDto {
  @IsEnum(ROLE)
  role: ROLE;
}
