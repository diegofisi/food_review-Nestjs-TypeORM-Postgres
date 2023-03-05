import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ReviewController } from './review.controller';
import { ConfigModule } from '@nestjs/config';
import { ReviewImage } from 'src/images/entities/image.entity';
import { Review } from './entities/review.entity';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    TypeOrmModule.forFeature([ReviewImage, Review, ReviewImage]),
    AuthModule,
    ConfigModule,
    CommonModule,
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
