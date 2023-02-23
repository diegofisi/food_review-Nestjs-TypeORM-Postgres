import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
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
    const imagen: PostImage[] = [];
    const promiseImagen: Promise<PostImage>[] = [];
    const secureUrl = files.map(async (file) => {
      const bitmap = fs.readFileSync(file.path);
      const base64 = Buffer.from(bitmap).toString('base64');
      // const buffer = Buffer.from(base64, 'base64');
      // const tempFilePath = `${Date.now()}.jpg`;
      // fs.writeFileSync(tempFilePath, buffer);
      // const image = fs.readFileSync(tempFilePath);
      // console.log(image);
      // fs.unlinkSync(tempFilePath);
      const image = new PostImage();
      image.image = base64;
      imagen.push(image);
      promiseImagen.push(this.postImageRepository.save(image));
    });
    const algo = await Promise.all(promiseImagen);
    return { algo };
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
