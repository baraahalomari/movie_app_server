import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users } from './entity/auth.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module ({
  imports: [TypeOrmModule.forFeature([Users]), JwtModule.register({})],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}