import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() userData: UserDto) {
    return this.authService.registerUser(userData);
  }

  @Post('/auth')
  auth(@Body() userData: UserDto) {
    return this.authService.authUser(userData)
  }

}
