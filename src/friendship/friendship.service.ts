import { Injectable } from '@nestjs/common';
import { Friendship } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFriendshipDto } from 'src/dto/create-friendship.dto';

@Injectable()
export class FriendshipService {
  constructor(private readonly prisma: PrismaService) {}

  async createFriendship(item: CreateFriendshipDto): Promise<Friendship> {
    const { user1Id, user2Id } = item;
    return await this.prisma.friendship.create({ data: { user1Id, user2Id } });
  }

  async getFriendsForUser(userId: number): Promise<Friendship[]> {
    return await this.prisma.friendship.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });
  }

  async deleteFriendship(id: number): Promise<Friendship> {
    return await this.prisma.friendship.delete({ where: { id } });
  }
}
