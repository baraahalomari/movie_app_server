import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcryptjs');
import { Repository } from 'typeorm';
import { Users } from './entity/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async signup(user: CreateUserDto) {
    try {
      const isExist = await this.userRepository.findOne({ where: { email: user.email } });
      console.log(isExist);
      if (isExist !== null) {
        return 'User already exist'
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = this.userRepository.create({
        name: user.name,
        email: user.email,
        password: hashedPassword
      });
      await this.userRepository.save(newUser);
      const token = this.signToken(newUser);
      return token;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Could not create user');
    }
  }

  // async signup(user: CreateUserDto) {
  //   const isExist = await this.userRepository.findOne({ where: { email: user.email } });
  //   if (isExist) {
  //     return 'User already exist'
  //   }
  //   const hashPass = await bcrypt.hash(user.password, 10);
  //   const newUser = this.userRepository.create({
  //     name: user.name,
  //     email: user.email,
  //     password: hashPass
  //   });
  //   await this.userRepository.save(newUser);
  //   const token = jwt.sign({ id: newUser.id }, 'secret', { expiresIn: '1h' });
  //   return {token};
  // }


  // sign a user

  async login(email: string, password: string){
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      return 'User not found';
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return 'Wrong password';
    }
    const token = this.signToken(user);
    return token;
  }

  // async login(email: string, password: string) {
  //   const existingUser = await this.userRepository.findOne({ where: { email } });
  //   if (!existingUser) return 'User not found';
  //   const isCorrect = await bcrypt.compare(password, existingUser.password);  
  //   if (!isCorrect) return 'Password Invalid';
  //   const token = jwt.sign({ id: existingUser.id }, 'secret', { expiresIn: '1h' });
  //   return {token};
  // }

  async signToken(
    user : CreateUserDto
  ): Promise<{ access_token: string }> {
    const payload = {user};
    const secret = 'JWT_SECRET';

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '1h',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }

}
