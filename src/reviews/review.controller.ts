import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UploadedFiles,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ConfigService } from '@nestjs/config';
import { CreateReviewDto } from './dto/create-review.dto';
import { FileValidatorsPipe } from 'src/common/pipes/parseFile.pipe';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { CustomImagesInterceptor } from 'src/common/interceptors/images.interceptor';
import { User } from 'src/auth/users/entities/user.entity';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reviewService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.findOne(id);
  }

  //alternative way to upload images -> you can upload a file with form data
  // it's more simple than the post 'upload' way
  @Post()
  @Auth()
  @CustomImagesInterceptor('files')
  async create(
    @UploadedFiles(FileValidatorsPipe)
    files: Express.Multer.File[],
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ) {
    return await this.reviewService.create(files, createReviewDto, user);
  }

  //alternative way to upload images
  @Post('upload')
  @Auth()
  async create2(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ) {
    return await this.reviewService.create2(createReviewDto, user);
  }

  //this is the way to update images it's more simple than the patch 'upload' way
  //you can upload a file with form data and update the review
  @Patch(':id')
  @Auth()
  @CustomImagesInterceptor('files')
  update(
    @UploadedFiles(FileValidatorsPipe)
    files: Express.Multer.File[],
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUser() user: User,
  ) {
    return this.reviewService.update(id, files, updateReviewDto, user);
  }

  @Patch('upload/:id')
  @Auth()
  update2(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUser() user: User,
  ) {
    return this.reviewService.update2(id, updateReviewDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.remove(id);
  }
}
