import { Module } from '@nestjs/common';
import { OpinionService } from './opinions.service';
import { OpinionController } from './opinions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Opinion } from './entities/opinion.entity';

@Module({
  controllers: [OpinionController],
  providers: [OpinionService],
  imports: [TypeOrmModule.forFeature([Opinion]), AuthModule],
})
export class OpinionModule {}
