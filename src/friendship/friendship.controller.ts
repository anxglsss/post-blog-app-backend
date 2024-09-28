import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateFriendshipDto } from 'src/dto/create-friendship.dto';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post()
  async createFriendShip(@Body() item: CreateFriendshipDto) {
    return this.friendshipService.createFriendship(item);
  }

  @Get(':userId')
  async getFriendsForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.friendshipService.getFriendsForUser(userId);
  }

  @Delete(':id')
  async deleteFriendship(@Param('id', ParseIntPipe) id: number) {
    return this.friendshipService.deleteFriendship(id);
  }
}
