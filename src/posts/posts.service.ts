import { Injectable } from '@nestjs/common';
import { Comment } from 'src/comments/entities/comment.entity';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { PostImage } from 'src/images/entities/image.entity';
import { ImagesService } from 'src/images/images.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly imageService: ImagesService,
    private readonly configService: ConfigService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    // const favorites: Favorite[] = [];
    // const comments: Comment[] = [];
    // const imagenes: PostImage[] = [];
    const { images, ...productDetails } = createPostDto;
    const idImages = images.map((image) =>
      this.postImageRepository.findOneBy({ id: image }),
    );
    const imagesId = Promise.all(idImages);
    const post = this.postsRepository.create({
      ...productDetails,
      images: await imagesId,
    });
    const poster = await this.postsRepository.save(post);
    return poster;
  }

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
