import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { RequestTimeMiddleware } from 'src/middlewares/request-time.middleware';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, RequestTimeMiddleware).forRoutes('*');
  }
}
