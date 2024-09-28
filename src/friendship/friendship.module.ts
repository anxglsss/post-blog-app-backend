import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, PrismaService],
})
export class FriendshipModule {}
