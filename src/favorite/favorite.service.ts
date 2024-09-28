import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(item: CreateFavoriteDto): Promise<Favorite> {
    const { userId, postId } = item;
    const post = await this.prisma.post.findFirst({
      where: {
        id: item.postId,
      },
    });
    if (!post) throw new NotFoundException('Post not found');

    return await this.prisma.favorite.create({
      data: {
        postId,
        userId,
      },
    });
  }
  async deleteFavorite(item: CreateFavoriteDto): Promise<Favorite> {
    const { userId, postId } = item;

    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (!favorite) throw new NotFoundException('Favorite not found');

    return await this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });
  }

  async getFavoritesByPost(id: number) {
    return await this.prisma.favorite.findMany({
      where: {
        postId: id,
      },
    });
  }

  async getFavoritesByUser(id: number) {
    return await this.prisma.favorite.findMany({
      where: {
        userId: id,
      },
    });
  }
}
