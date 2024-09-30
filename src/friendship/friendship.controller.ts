import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateFriendshipDto } from 'src/dto/create-friendship.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
@UseInterceptors(LoggingInterceptor)
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post()
  async createFriendShip(@Body() item: CreateFriendshipDto) {
    return this.friendshipService.createFriendship(item);
  }

  @Delete(':id')
  async deleteFriendship(@Param('id', ParseIntPipe) id: number) {
    return this.friendshipService.deleteFriendship(id);
  }

  @Get(':userId')
  async getFriendsForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.friendshipService.getFriendsForUser(userId);
  }
}
