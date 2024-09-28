import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFriendshipDto {
  @IsNotEmpty()
  @IsNumber()
  user1Id: number;

  @IsNotEmpty()
  @IsNumber()
  user2Id: number;
}
