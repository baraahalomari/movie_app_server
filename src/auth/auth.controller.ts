import { Body, Controller, Post} from '@nestjs/common' ;
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')

export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  signin(@Body() createUserDto : CreateUserDto){
    return this.authService.login(createUserDto.email, createUserDto.password);
  }

  @Post('signup')
  signup(@Body() createUserDto : CreateUserDto){
    return this.authService.signup(createUserDto);
  }
}  

