import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async addLike(@Body() item: CreateFavoriteDto) {
    return this.favoriteService.addFavorite(item);
  }

  @Delete()
  async deleteLike(@Body() item: CreateFavoriteDto) {
    return await this.favoriteService.deleteFavorite(item);
  }

  @Get('post/:id')
  async getFavoritesByPost(@Param('id', ParseIntPipe) id: number) {
    return await this.favoriteService.getFavoritesByPost(id);
  }

  @Get('user/:id')
  async getFavoritesByUser(@Param('id', ParseIntPipe) id: number) {
    return await this.favoriteService.getFavoritesByUser(id);
  }
}