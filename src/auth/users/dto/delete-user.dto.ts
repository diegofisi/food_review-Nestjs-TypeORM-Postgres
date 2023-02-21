import { IsEmail, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsString()
  @IsEmail()
  email: string;
}
