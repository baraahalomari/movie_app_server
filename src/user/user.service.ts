import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll():Promise<User[]>{
    return this.userRepository.find();
  }

  create(createUserDto : CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  getById(id : number)  {
    return this.userRepository.findOne({where: {id}});
  } 

  // delet user
  delete(id : number){
    return this.userRepository.delete(id);
  }

  updateUser(updateUser : CreateUserDto , id : number) {
    return this.userRepository.update(id, updateUser );
  }
}

