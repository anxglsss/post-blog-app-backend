import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user && !(await this.verifyPassword(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async verifyPassword(userPassword: string, password: string) {
    return bcrypt.compare(userPassword, password);
  }

  async login(user: User) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    console.log(user);
    const userExists = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
    if (userExists) throw new UnauthorizedException('User already exists');

    const hashedPass = await bcrypt.hash(user.password, 10);
    const newUser = await this.prismaService.user.create({
      data: {
        password: hashedPass,
        email: user.email,
        name: user.name,
      },
    });

    const payload = { id: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
