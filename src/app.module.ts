import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, RolesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
