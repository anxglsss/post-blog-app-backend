import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
