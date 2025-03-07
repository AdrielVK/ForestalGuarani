import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/database/repository/user.repository';
import { IUser } from 'src/interfaces/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JSON.parse(configService.get<string>('JWT_SECRET'))
        .public_key,
      algorithms: ['ES384'],
    });
  }

  async validate(payload: any): Promise<IUser | UnauthorizedException> {
    const user = await this.usersService.findByUsername(payload.username); // Asume que `sub` es el userId
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
