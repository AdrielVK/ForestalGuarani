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
import { JwtAuthGuard, JwtRoleAdminGuard } from 'src/bussiness/auth/jwt.guard';
import {
  ChangeRoleDto,
  CreateUserDto,
  EditPasswordRequestControllerDto,
  EditPasswordRequestDto,
  LoginUserDto,
} from 'src/dto/user.dto';
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
  @UseGuards(JwtRoleAdminGuard)
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
  @UseGuards(JwtRoleAdminGuard)
  public async create(
    @Body(new ValidationPipe()) data: CreateUserDto,
  ): Promise<ResponseInterface<ResponseRegister>> {
    return await this.authBussiness.createUser(data);
  }

  @Patch('change/password')
  @UseGuards(JwtAuthGuard)
  public async changePassword(
    @Body(new ValidationPipe()) data: EditPasswordRequestControllerDto,
    @Req() req,
  ): Promise<ResponseInterface<{ message: string }>> {
    const completeData: EditPasswordRequestDto = {
      ...data,
      reqUserId: req.user.id,
    };
    return await this.authBussiness.changePassword(completeData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async getMe(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('role/change/:id')
  public async changeRole(
    @Param('id', ParseIntPipe) userId,
    @Body(new ValidationPipe()) role: ChangeRoleDto,
  ): Promise<ResponseInterface<{ message: string; response: IUser }>> {
    return await this.authBussiness.changeRole(userId, role.role);
  }
}
