import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.prisma.comment.findUnique({ where: { id } });
  }

  create(item: CreateCommentDto): Promise<Comment> {
    console.log(item);
    return this.prisma.comment.create({ data: item });
  }

  update(id: number, item: UpdateCommentDto): Promise<Comment> {
    return this.prisma.comment.update({ where: { id }, data: item });
  }

  delete(id: number): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id } });
  }
}
