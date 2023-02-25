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

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
