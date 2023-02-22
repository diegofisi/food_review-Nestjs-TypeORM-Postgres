import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageNamer } from 'src/images/helpers/imageNamer.helper';

export const CustomImageInterceptor = (arg: string) => {
  return UseInterceptors(
    FilesInterceptor(arg, 3, {
      storage: diskStorage({
        destination: './static/products',
        filename: imageNamer,
      }),
    }),
  );
};
