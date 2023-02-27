import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Review } from 'src/reviews/entities/review.entity';
import { Repository } from 'typeorm';
import { CreateFavoritesDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly configservice: ConfigService,
  ) {}

  async create(createFavoritesDto: CreateFavoritesDto, user: User) {
    const reviews = createFavoritesDto.reviews.map((review) => review);
    reviews.map(async (review) => {
      const post = await this.reviewRepository.findOneBy({ id: review });
      const favorite = this.favoritesRepository.create();
      favorite.reviews.push(post);
      favorite.user = user;
      post.favorites.push(favorite);
      return await this.favoritesRepository.save(favorite);
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const {
      limit = this.configservice.get('LIMIT'),
      offset = this.configservice.get('OFFSET'),
    } = paginationDto;
    try {
      const favorites = await this.favoritesRepository.find({
        take: limit,
        skip: offset,
      });
      return favorites;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Please check server logs');
  }
}
