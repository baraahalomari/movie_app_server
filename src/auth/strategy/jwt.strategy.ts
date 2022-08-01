import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Repository } from 'typeorm';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { Users } from '../entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'JWT_SECRET',
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }) {
    const user =
      await this.userRepository.findOne({
        where: {
          id: payload.sub,
        },
      });
    return user;
  }
}
