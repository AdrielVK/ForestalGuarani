import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserRepository } from 'src/database/repository/user.repository';
import { IUser, ROLE } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: UserRepository) {}

  public async listUsers(): Promise<IUser[] | null> {
    try {
      const users = await this.authRepository.listUsers();
      if (!users) return null;
      const response: IUser[] = users.map((user) => ({
        username: user.username,
        id: user.id,
        email: user.email ? user.email : null,
        role: user.role,
      }));

      return response;
    } catch {
      return null;
    }
  }

  public async changeRole(userId: number, role: ROLE): Promise<IUser | null> {
    try {
      const res = await this.authRepository.changeRole(userId, role as Role);
      if (!res) return null;
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
