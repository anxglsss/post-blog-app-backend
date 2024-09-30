import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
@UseInterceptors(LoggingInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Post()
  async create(@Body() item: CreateCommentDto) {
    return await this.commentService.create(item);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() item: CreateCommentDto) {
    return this.commentService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.delete(id);
  }
}
