import { Module } from '@nestjs/common';
import { OpinionService } from './opinions.service';
import { OpinionController } from './opinions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Opinion } from './entities/opinion.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
  controllers: [OpinionController],
  providers: [OpinionService],
  imports: [TypeOrmModule.forFeature([Opinion, Review]), AuthModule],
})
export class OpinionModule {}
