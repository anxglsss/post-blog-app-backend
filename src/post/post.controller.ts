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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { TransformInterceptor } from 'src/transform.interceptor';
import { ValidatePricePipe } from './pipes/validate-price.pipe';
import { PostService } from './post.service';

@Controller('post')
@UseInterceptors(TransformInterceptor)
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
  create(@Body() item: CreatePostDto) {
    return this.postService.create(item);
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
