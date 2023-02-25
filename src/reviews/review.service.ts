import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { ImagesService } from 'src/images/images.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-review.dto';
import { UpdatePostDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { ReviewImage } from 'src/images/entities/image.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly imageService: ImagesService,
    private readonly configService: ConfigService,
    @InjectRepository(Review)
    private readonly postsRepository: Repository<Review>,
    @InjectRepository(ReviewImage)
    private readonly postImageRepository: Repository<ReviewImage>,
  ) {}

  // async create(createPostDto: CreatePostDto) {
  //   const { images, ...productDetails } = createPostDto;
  //   const idImages = images.map(async (image) => {
  //     const id = await this.postImageRepository.findOneBy({ id: image });
  //     if (!id) {
  //       throw new BadRequestException('Image not found');
  //     }
  //     return id;
  //   });
  //   const post = this.postsRepository.create({
  //     ...productDetails,
  //     images: await Promise.all(idImages),
  //   });
  //   const poster = await this.postsRepository.save(post);
  //   return poster;
  // }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
