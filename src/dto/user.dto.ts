import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ROLE } from 'src/interfaces/auth.interface';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
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
