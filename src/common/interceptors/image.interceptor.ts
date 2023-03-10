import { BadRequestException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageNamer } from '../helpers/imageNamer.helper';

export const CustomImageInterceptor = (arg: string) => {
  return UseInterceptors(
    FileInterceptor(arg, {
      /*you can delete storage option
      if you want to use default diskStorage 
      or you can use your own storage*/
      storage: diskStorage({
        destination: './static/images',
        filename: imageNamer,
      }),
      limits: {
        fileSize: 1024 * 1024 * 3, // 3MB
        files: 1,
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)) {
          return callback(
            new BadRequestException('just images and gifs are allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  );
};
