import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLikeDto } from '../dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async addLike(item: CreateLikeDto): Promise<Like> {
    const { userId, postId } = item;
    const post = await this.prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) throw new NotFoundException('Post not found');

    return await this.prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async deleteLike(item: CreateLikeDto): Promise<Like> {
    const { userId, postId } = item;
    const like = await this.prisma.like.findFirst({
      where: { userId, postId },
    });

    if (!like) throw new NotFoundException('Like not found');
    return await this.prisma.like.delete({
      where: { id: like.id },
    });
  }

  async getLikesByPost(postId: number): Promise<Like[]> {
    return this.prisma.like.findMany({
      where: {
        postId,
      },
    });
  }

  async getLikesByUser(userId: number): Promise<Like[]> {
    return this.prisma.like.findMany({
      where: {
        userId,
      },
    });
  }
}
