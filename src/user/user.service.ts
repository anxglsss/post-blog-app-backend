import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(item: CreateUserDto): Promise<User> {
    console.log(item);
    return this.prisma.user.create({ data: item });
  }

  update(id: number, item: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: item });
  }

  delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
