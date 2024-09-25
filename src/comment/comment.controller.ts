import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
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
  create(@Body() item: CreateCommentDto) {
    return this.commentService.create(item);
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
