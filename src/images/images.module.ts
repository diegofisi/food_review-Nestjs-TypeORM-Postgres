import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { PostImage } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([PostImage]), AuthModule, ConfigModule],
  exports: [ImagesService],
})
export class ImagesModule {}
