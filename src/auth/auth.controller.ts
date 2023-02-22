import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces/valid-roles';
import { CreateUserDto } from './users/dto/create-user.dto';
import { DeleteUserDto } from './users/dto/delete-user.dto';
import { LoginUserDto } from './users/dto/login-user.dto';
import { User } from './users/entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Get('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('delete-my-account')
  @Auth()
  deleteAccount(@GetUser() user: User) {
    return this.authService.deleteAccount(user);
  }

  @Post('delete-user')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.authService.deleteUser(deleteUserDto);
  }

  @Get('check-auth')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  // @Get('private3')
  // @Auth(ValidRoles.user)
  // privateRoute3(@GetUser() user: User) {
  //   return user;
  // }
}
