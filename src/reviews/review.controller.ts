import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { UpdatePostDto } from './dto/update-review.dto';
import { ImagesService } from 'src/images/images.service';
import { ConfigService } from '@nestjs/config';
import { CreatePostDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly imageService: ImagesService,
    private readonly configService: ConfigService,
  ) {}

  // @Post()
  // create(@Body() createPostDto: CreatePostDto) {
  //   return this.postsService.create(createPostDto);
  // }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return;
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.reviewService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
