import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
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
    const promiseImagen: Promise<PostImage>[] = [];

    files.map(async (file) => {
      const image = new PostImage();
      const bitmap = fs.readFileSync(file.path);
      const base64 = Buffer.from(bitmap).toString('base64');
      image.image = base64;
      promiseImagen.push(this.postImageRepository.save(image));
    });

    return await Promise.all(promiseImagen);
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
