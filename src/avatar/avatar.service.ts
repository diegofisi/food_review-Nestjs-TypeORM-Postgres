import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from './entities/avatar.entity';
import { User } from 'src/auth/users/entities/user.entity';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
  ) {}

  async create(files: Express.Multer.File[], user: User) {
    const images: Promise<Avatar>[] = [];

    files.map((file) => {
      const image = new Avatar();
      const bitmap = fs.readFileSync(file.path);
      const base64 = Buffer.from(bitmap).toString('base64');
      image.image = base64;
      image.user = user;
      images.push(this.avatarRepository.save(image));
    });

    return await Promise.all(images);
  }

  async findAll(user: User) {
    const id = user.id;
    const avatar = await this.avatarRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
    avatar.map((avatar) => delete avatar.image);
    return avatar;
  }

  async remove(user: User) {
    const id = user.id;
    const avatar = await this.avatarRepository.find({
      where: {
        user: {
          id,
        },
      },
    });

    const idAvatar = await this.avatarRepository.delete(id);
    return `${idAvatar.toString()} was deleted`;
  }
}
