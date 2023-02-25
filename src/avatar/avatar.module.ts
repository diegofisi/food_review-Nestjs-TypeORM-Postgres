import { Module } from '@nestjs/common';
import { Avatar } from './entities/avatar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';

@Module({
  controllers: [AvatarController],
  providers: [AvatarService],
  imports: [TypeOrmModule.forFeature([Avatar]), AuthModule, ConfigModule],
  exports: [AvatarService],
})
export class AvatarModule {}
