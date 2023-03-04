import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { ImagesModule } from './images/images.module';
import { OpinionModule } from './opinions/opinions.module';
import { ProfileModule } from './profile/profile.module';
import { ReviewModule } from './reviews/review.module';
import { CommonModule } from './common/common.module';
import { BodySizeMiddleware } from './common/middlewares/BodySize.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ReviewModule,
    ImagesModule,
    CommonModule,
    OpinionModule,
    ProfileModule,
    AvatarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BodySizeMiddleware).forRoutes({
      path: 'reviews',
      method: RequestMethod.POST,
    });
  }
}
