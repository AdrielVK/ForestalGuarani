import { Role, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '../prisma';
import { CreateUserDto } from 'src/dto/user.dto';
//import { ROLE } from 'src/interfaces/auth.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  }

  public async listUsers(): Promise<User[] | null> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          role: {
            in: [Role.READER, Role.EDITOR],
          },
        },
      });
      if (!users) return null;
      return users;
    } catch {
      return null;
    }
  }

  public async findById(id: number): Promise<User | null> {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) return null;
    return user;
  }

  public async createUser(data: CreateUserDto): Promise<User | null> {
    try {
      return this.prisma.user.create({
        data: {
          username: data.username,
          password: data.password,
        },
      });
    } catch {
      return null;
    }
  }

  public async changeRole(idUser: number, role: Role): Promise<User | null> {
    try {
      console.log(role); // Solo para verificar que estamos pasando el rol correctamente
      return this.prisma.user.update({
        where: { id: idUser },
        data: {
          role: role, // Aquí asignamos el valor del role directamente
        },
      });
    } catch (error) {
      // Manejo de errores más detallado
      console.error('Error cambiando el rol:', error);
      return null;
    }
  }
}
