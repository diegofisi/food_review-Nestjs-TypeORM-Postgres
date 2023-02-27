import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';
import { ReviewController } from './review.controller';
import { ConfigModule } from '@nestjs/config';
import { ReviewImage } from 'src/images/entities/image.entity';
import { Review } from './entities/review.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    TypeOrmModule.forFeature([ReviewImage, Review]),
    AuthModule,
    ImagesModule,
    ConfigModule,
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
