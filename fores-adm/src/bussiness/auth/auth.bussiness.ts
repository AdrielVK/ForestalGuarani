import { JwtService } from '@nestjs/jwt';
import {
  IUser,
  ResponseLogin,
  ResponseRegister,
  ROLE,
} from '../../interfaces/auth.interface';
import { ResponseClass } from 'src/config/handless/response-class';
import { UserRepository } from 'src/database/repository/user.repository';
import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import { ResponseInterface } from 'src/interfaces/response.interface';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.services';

@Injectable()
export class AuthBussiness extends ResponseClass {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  public async createUser(
    data: CreateUserDto,
  ): Promise<ResponseInterface<ResponseRegister>> {
    const user = await this.userRepository.findByUsername(data.username);
    if (user) {
      return this.badRequest('Ya existe un usuario con ese nombre de usuario');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    await this.userRepository.createUser(data);

    return this.success({ message: 'Usuario creado' });
  }

  public async listUsers(): Promise<ResponseInterface<IUser[]>> {
    const response = await this.authService.listUsers();
    if (!response)
      return this.badRequest({ message: 'Error al obtener lista de usuarios' });
    return this.success(response);
  }

  public async changeRole(
    userId: number,
    role: ROLE,
  ): Promise<ResponseInterface<{ message: string; response: IUser }>> {
    const response = await this.authService.changeRole(userId, role);
    console.log(response);
    if (!response) return this.badRequest({ message: 'Error al cambiar rol' });
    return this.success({
      message: 'Cambio de rol exitoso',
      response: response,
    });
  }

  public async login(
    data: LoginUserDto,
  ): Promise<ResponseInterface<ResponseLogin | string>> {
    const user = await this.userRepository.findByUsername(data.username);
    if (!user) {
      console.log('email', user);
      return this.forbidden('No se encontro un usuario');
    }
    const passwordValid: boolean = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (passwordValid) {
      const payload = {
        email: user.email,
        sub: user.id,
        username: user.username,
        role: user.role,
      };

      return this.success({
        message: 'Sesion iniciada',
        access_token: this.jwtService.sign(payload),
      });
    }

    return this.forbidden('Credenciales inválidas');
  }
}
