import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UploadedFiles,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ImagesService } from 'src/images/images.service';
import { ConfigService } from '@nestjs/config';
import { CreateReviewDto } from './dto/create-review.dto';
import { CustomImageInterceptor } from 'src/avatar/decorators/avatarInterceptor.decorator';
import { FileValidatorsPipe } from 'src/avatar/pipes/parseFile.pipe';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  //alternative way to upload images -> you can upload a file with form data
  @Post('upload')
  @CustomImageInterceptor('files')
  async uploadImage(
    @UploadedFiles(FileValidatorsPipe)
    files: Express.Multer.File[],
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return await this.reviewService.create2(files, createReviewDto);
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
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
