import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ValidatePricePipe } from './pipes/validate-price.pipe';
import { PostService } from './post.service';

@Controller('post')
@UseInterceptors(LoggingInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  @UsePipes(ValidatePricePipe)
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() item: UpdatePostDto) {
    return this.postService.update(id, item);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
