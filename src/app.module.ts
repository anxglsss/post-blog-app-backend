import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
    UserModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
