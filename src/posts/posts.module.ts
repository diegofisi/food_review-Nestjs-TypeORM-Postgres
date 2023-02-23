import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';
import { PostsController } from './posts.controller';
import { ConfigModule } from '@nestjs/config';
import { PostImage } from 'src/images/entities/image.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post, PostImage]),
    AuthModule,
    ImagesModule,
    ConfigModule,
  ],
})
export class PostsModule {}
