import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CreateUserDto } from '../dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: CreateUserDto) {
    const isValidate = await this.authService.validateUser(
      user.email,
      user.password,
      user.name,
    );
    if (!isValidate) throw new UnauthorizedException();

    return this.authService.login(isValidate);
  }
}
