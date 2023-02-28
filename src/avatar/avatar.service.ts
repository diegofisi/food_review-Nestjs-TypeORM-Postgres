import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from './entities/avatar.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
    private readonly configService: ConfigService,
  ) {}

  // async create2(files: Express.Multer.File[], user: User) {
  //   const images: Promise<Avatar>[] = [];

  //   files.map((file) => {
  //     const image = new Avatar();
  //     const bitmap = fs.readFileSync(file.path);
  //     const base64 = Buffer.from(bitmap).toString('base64');
  //     image.image = base64;
  //     image.user = user;
  //     if (!user.avatar) user.avatar = image;
  //     images.push(this.avatarRepository.save(image));
  //   });

  //   return await Promise.all(images);
  // }

  async create(file: Express.Multer.File, user: User) {
    const image = new Avatar();
    const bitmap = fs.readFileSync(file.path);
    const base64 = Buffer.from(bitmap).toString('base64');
    image.image = base64;
    if (user.avatar) return (user.avatar = image);
    image.user = user;
    return await this.avatarRepository.save(image);
  }

  async findAll(paginationDto: PaginationDto, user: User) {
    const {
      limit = this.configService.get('LIMIT'),
      offset = this.configService.get('OFFSET'),
    } = paginationDto;
    const avatar = await this.avatarRepository.find({
      take: limit,
      skip: offset,
      // relations: {
      //   user: true,
      // },
      // where: {
      //   user: {
      //     id: user.id,
      //   },
      // },
    });
    avatar.map((avatar) => delete avatar.image);
    return avatar;
  }

  async update(id: string, user: User) {
    const avatar = await this.avatarRepository.findOne({
      where: {
        id: id,
        user: {
          id: user.id,
        },
      },
    });

    if (!avatar) throw new NotFoundException(`Avatar with id: ${id} not found`);

    if (avatar) {
      user.avatar = avatar;
      await this.avatarRepository.save(user.avatar);
      delete user.avatar.image;
    }
    return user.avatar;
  }

  async remove(id: string, user: User) {
    const avatar = await this.avatarRepository.find({
      where: {
        user: {
          id: user.id,
        },
        id: id,
      },
    });

    if (!avatar || avatar.length === 0)
      throw new NotFoundException(`Product with id: ${id} not found`);

    if (avatar && avatar.length > 0) {
      await this.avatarRepository.delete(id);
      return `Avatar with id: ${id} was deleted`;
    }

    return 'You are not allowed to delete this avatar';
  }
}
