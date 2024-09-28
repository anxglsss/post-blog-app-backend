import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async addLike(@Body() item: CreateLikeDto) {
    return await this.likeService.addLike(item);
  }

  @Delete()
  async deleteLike(@Body() item: CreateLikeDto) {
    return await this.likeService.deleteLike(item);
  }

  @Get('post/:id')
  async getLikesByPost(@Param('id', ParseIntPipe) id: number) {
    return await this.likeService.getLikesByPost(id);
  }

  @Get('post/:id')
  async getLikesByUser(@Param('id', ParseIntPipe) id: number) {
    return await this.likeService.getLikesByUser(id);
  }
}
