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
import { ImagesService } from 'src/images/images.service';
import { ConfigService } from '@nestjs/config';
import { CreateReviewDto } from './dto/create-review.dto';
import { FileValidatorsPipe } from 'src/common/pipes/parseFile.pipe';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { CustomImagesInterceptor } from 'src/common/interceptors/images.interceptor';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @Auth()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  //alternative way to upload images -> you can upload a file with form data
  @Post('upload')
  @Auth()
  @CustomImagesInterceptor('files')
  async uploadImage(
    @UploadedFiles(FileValidatorsPipe)
    files: Express.Multer.File[],
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return await this.reviewService.create2(files, createReviewDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reviewService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
