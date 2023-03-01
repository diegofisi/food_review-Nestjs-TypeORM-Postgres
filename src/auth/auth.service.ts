import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, DeleteUserDto, LoginUserDto } from './users/dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'src/profile/entities/profile.entity';
import { CreateAvatarDto } from '../avatar/dto/create-avatar.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly jwtService: JwtService,
    private readonly configservice: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, nickname, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      const profile = this.profileRepository.create({
        nickname,
      });
      const userInfo = await this.userRepository.save(user);
      profile.user = userInfo;
      await this.profileRepository.save(profile);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');
    //if (user.avatar) delete user.avatar.image;
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async deleteAccount(user: User) {
    try {
      user.isActive = false;
      await this.userRepository.save(user);
      return { message: 'User deleted' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async getAllUsers(paginationDto: PaginationDto) {
    const {
      limit = this.configservice.get('LIMIT'),
      offset = this.configservice.get('OFFSET'),
    } = paginationDto;
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: {},
    });
    return users;
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: deleteUserDto.email },
      });
      user.isActive = false;
      await this.userRepository.save(user);
      return { message: `User with ${deleteUserDto.email} deleted` };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Please check server logs');
  }
}
