import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const customParseFilePipe = () => {
  return new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif)' }),
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
    ],
  });
};
