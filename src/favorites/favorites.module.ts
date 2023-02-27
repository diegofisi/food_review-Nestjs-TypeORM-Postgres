import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Review } from 'src/reviews/entities/review.entity';
import { ReviewModule } from '../reviews/review.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([Favorite, Review]),
    AuthModule,
    ConfigModule,
    ReviewModule,
  ],
})
export class FavoritesModule {}
