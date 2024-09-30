import { Injectable, NotFoundException } from '@nestjs/common';
import { Request, Status } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRequestDto } from '../dto/create-request.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async createRequest(item: CreateRequestDto): Promise<Request> {
    const { requesterId, receiverId } = item;
    if (!requesterId || !receiverId)
      throw new NotFoundException('Requester or receiver not found');

    return await this.prisma.request.create({
      data: { requesterId, receiverId },
    });
  }

  async updateStatusRequest(id: number, status: Status): Promise<Request> {
    const request = await this.prisma.request.findFirst({
      where: { id },
    });
    if (!request) throw new NotFoundException('Request Not Found!');

    return await this.prisma.request.update({
      where: { id },
      data: { status },
    });
  }

  async deleteRequest(id: number): Promise<Request> {
    const request = await this.prisma.request.findFirst({
      where: { id },
    });
    if (!request) throw new NotFoundException('Request not found');
    return await this.prisma.request.delete({
      where: { id },
    });
  }

  async getRequestsByUser(id: number): Promise<Request[]> {
    return await this.prisma.request.findMany({
      where: {
        receiverId: id,
      },
    });
  }
}
