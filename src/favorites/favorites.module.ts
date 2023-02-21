import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TypeOrmModule.forFeature([Favorite]), AuthModule],
})
export class FavoritesModule {}
