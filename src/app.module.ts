import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';
import { FavoriteModule } from './favorite/favorite.module';
import { RequestModule } from './request/request.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
    UserModule,
    CommentModule,
    AuthModule,
    LikeModule,
    FavoriteModule,
    RequestModule,
    FriendshipModule,
  ],
})
export class AppModule {}
