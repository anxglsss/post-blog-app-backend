import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
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
    );
    if (!isValidate) throw new UnauthorizedException();

    return this.authService.login(isValidate);
  }
}
