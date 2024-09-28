import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  create(item: CreatePostDto): Promise<Post> {
    console.log(item);
    return this.prisma.post.create({ data: item });
  }

  update(id: number, item: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({ where: { id }, data: item });
  }

  delete(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}
