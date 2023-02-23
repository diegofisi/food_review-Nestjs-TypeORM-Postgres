import { Body, Controller, Post, UploadedFiles } from '@nestjs/common';
import { CustomImageInterceptor } from './decorators/imageInterceptor.decorator';
import { customParseFilePipe } from './pipes/parseFile.pipe';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post()
  @CustomImageInterceptor('files')
  uploadImage(
    @UploadedFiles(customParseFilePipe())
    files: Express.Multer.File[],
    @Body() createImageDto: CreateImageDto,
  ) {
    createImageDto;
    return this.imagesService.create(files);
    // const secureUrl = files.map((file) => {
    //   const bitmap = fs.readFileSync(file.path);
    //   const base64 = Buffer.from(bitmap).toString('base64');
    //   // const buffer = Buffer.from(base64, 'base64');
    //   // const tempFilePath = `${Date.now()}.jpg`;
    //   // fs.writeFileSync(tempFilePath, buffer);
    //   // const image = fs.readFileSync(tempFilePath);
    //   // console.log(image);
    //   // fs.unlinkSync(tempFilePath);
    //   return base64;
    // });
    // return { secureUrl };
  }
}
