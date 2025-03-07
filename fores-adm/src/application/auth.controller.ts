import {
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthBussiness } from 'src/bussiness/auth/auth.bussiness';
import { JwtAuthGuard } from 'src/bussiness/auth/jwt.guard';
import { ChangeRoleDto, CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import { ResponseInterface } from 'src/interfaces/response.interface';
import {
  IUser,
  ResponseLogin,
  ResponseRegister,
} from 'src/interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authBussiness: AuthBussiness) {}

  @Get()
  public async listUsers(): Promise<ResponseInterface<IUser[]>> {
    return await this.authBussiness.listUsers();
  }

  @Post('login')
  public async login(
    @Body(new ValidationPipe()) data: LoginUserDto,
  ): Promise<ResponseInterface<ResponseLogin | string>> {
    return await this.authBussiness.login(data);
  }

  @Post('register')
  public async create(
    @Body(new ValidationPipe()) data: CreateUserDto,
  ): Promise<ResponseInterface<ResponseRegister>> {
    return await this.authBussiness.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async getMe(@Req() req) {
    return req.user;
  }

  @Patch('role/change/:id')
  public async changeRole(
    @Param('id', ParseIntPipe) userId,
    @Body(new ValidationPipe()) role: ChangeRoleDto,
  ): Promise<ResponseInterface<{ message: string; response: IUser }>> {
    console.log(role);
    return await this.authBussiness.changeRole(userId, role.role);
  }
}
