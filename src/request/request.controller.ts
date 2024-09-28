import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { CreateRequestDto } from '../dto/create-request.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async createRequest(@Body() item: CreateRequestDto) {
    return await this.requestService.createRequest(item);
  }

  @Patch(':id')
  async updateStatusRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: Status,
  ) {
    return await this.requestService.updateStatusRequest(id, status);
  }

  @Get(':userId')
  async getRequestsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.requestService.getRequestsByUser(userId);
  }
}
