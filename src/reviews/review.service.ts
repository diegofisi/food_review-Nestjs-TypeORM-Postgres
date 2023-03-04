import {
  Injectable,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { ImagesService } from 'src/images/images.service';
import { DataSource, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { ReviewImage } from 'src/images/entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/users/entities/user.entity';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger('ReviewService');

  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(ReviewImage)
    private readonly reviewImageRepository: Repository<ReviewImage>,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  async create2(createReviewDto: CreateReviewDto, user: User) {
    try {
      const { images, ...productDetails } = createReviewDto;
      const review = this.reviewRepository.create({
        ...productDetails,
        profile: user.profile,
        createdBy: user.profile.id,
        images: images.map((image) =>
          this.reviewImageRepository.create({
            image: image.image,
            filename: image.filename,
          }),
        ),
      });
      const post = await this.reviewRepository.save(review);
      return { ...post };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async create(
    files: Express.Multer.File[],
    createReviewDto: CreateReviewDto,
    user: User,
  ) {
    const images: ReviewImage[] = [];
    const { images: imagesDto, ...productDetails } = createReviewDto;

    files.map((file) => {
      const image = new ReviewImage();
      const bitmap = fs.readFileSync(file.path);
      const base64 = Buffer.from(bitmap).toString('base64');
      image.image = base64;
      image.filename = file.filename;
      images.push(image);
    });

    if (imagesDto) {
      imagesDto.map((image) => {
        const reviewImage = new ReviewImage();
        reviewImage.image = image.image;
        reviewImage.filename = image.filename;
        images.push(reviewImage);
      });
    }

    const review = this.reviewRepository.create({
      ...productDetails,
      profile: user.profile,
      createdBy: user.profile.id,
      images: images.map((image) =>
        this.reviewImageRepository.create({
          image: image.image,
          filename: image.filename,
        }),
      ),
    });
    const post = await this.reviewRepository.save(review);
    return { ...post };
  }

  async findAll(paginationDto: PaginationDto) {
    const {
      limit = this.configService.get('LIMIT'),
      offset = this.configService.get('OFFSET'),
    } = paginationDto;
    const review = await this.reviewRepository.find({
      take: limit,
      skip: offset,
      relations: ['images', 'user'],
    });
    return review;
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id },
        relations: ['images', 'user', 'opinions'],
      });
      return { ...review };
    } catch (error) {
      throw new BadRequestException('Review not found ', error);
    }
  }

  async update2(id: string, updateReviewDto: UpdateReviewDto, user: User) {
    const { images, ...toUpdate } = updateReviewDto;

    const review = await this.reviewRepository.preload({ id, ...toUpdate });

    if (!review) {
      throw new BadRequestException(`Review with ${id} don't found`);
    }

    if (review.createdBy !== user.profile.id) {
      throw new BadRequestException(
        `You don't have permission to update this review`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ReviewImage, { review: review.id });
        review.images = images.map((image) =>
          this.reviewImageRepository.create({
            image: image.image,
            filename: image.filename,
          }),
        );
        review.updatedAt = new Date();
        await queryRunner.manager.save(review);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return review;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return this.handleDBExceptions(error);
    }
  }

  async update(
    id: string,
    files: Express.Multer.File[],
    updateReviewDto: UpdateReviewDto,
    user: User,
  ) {
    const images: ReviewImage[] = [];
    const { images: imagesDto, ...toUpdate } = updateReviewDto;

    const review = await this.reviewRepository.preload({ id, ...toUpdate });

    if (!review) {
      throw new BadRequestException(`Review with ${id} don't found`);
    }

    if (review.createdBy !== user.profile.id) {
      throw new BadRequestException(
        `You don't have permission to update this review`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (images || files) {
        await queryRunner.manager.delete(ReviewImage, { review: review.id });
        if (imagesDto) {
          imagesDto.map((image) => {
            const reviewImage = new ReviewImage();
            reviewImage.image = image.image;
            reviewImage.filename = image.filename;
            images.push(reviewImage);
          });
        }
        files.map((file) => {
          const image = new ReviewImage();
          const bitmap = fs.readFileSync(file.path);
          const base64 = Buffer.from(bitmap).toString('base64');
          image.image = base64;
          image.filename = file.filename;
          images.push(image);
        });

        review.images = images.map((image) =>
          this.reviewImageRepository.create({
            image: image.image,
            filename: image.filename,
          }),
        );
        review.updatedAt = new Date();
        await queryRunner.manager.save(review);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return review;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const review = await this.reviewRepository.findOneBy({ id });
      await this.reviewRepository.delete({ id });
      return review;
    } catch (error) {
      throw new BadRequestException(`Review with ${id} don't found`);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
