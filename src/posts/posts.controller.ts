import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ImagesService } from 'src/images/images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageNamer } from 'src/images/helpers/imageNamer.helper';
import { ConfigService } from '@nestjs/config';
import { CustomImageInterceptor } from './decorators/imageInterceptor.decorator';
import { customParseFilePipe } from './pipes/parseFile.pipe';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly imageService: ImagesService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Post('images')
  @CustomImageInterceptor('files')
  uploadImage(
    @Body() body: any,
    @UploadedFiles(customParseFilePipe())
    files: Express.Multer.File[],
  ) {
    const secureUrl = files.map((file) => {
      return file.filename;
    });
    return { secureUrl };
  }
}
