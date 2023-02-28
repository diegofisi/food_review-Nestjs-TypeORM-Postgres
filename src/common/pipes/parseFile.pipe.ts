import {
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  ParseFilePipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidatorsPipe implements PipeTransform {
  transform(value: any) {
    return new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
      ],
    }).transform(value);
  }
}
