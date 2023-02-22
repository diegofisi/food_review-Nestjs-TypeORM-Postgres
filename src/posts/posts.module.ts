import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';
import { PostsController } from './posts.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    ImagesModule,
    ConfigModule,
  ],
})
export class PostsModule {}
