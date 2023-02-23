import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PostImage } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,
  ) {}

  async create(files: Express.Multer.File[]) {
    const images: Promise<PostImage>[] = [];

    files.map(async (file) => {
      const image = new PostImage();
      const bitmap = fs.readFileSync(file.path);
      const base64 = Buffer.from(bitmap).toString('base64');
      image.image = base64;
      images.push(this.postImageRepository.save(image));
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
