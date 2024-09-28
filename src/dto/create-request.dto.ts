import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  requesterId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;
}
