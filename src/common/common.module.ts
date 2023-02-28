import { Module } from '@nestjs/common';
import { BodySizeMiddleware } from './middlewares/BodySize.middleware';
import { FileValidatorsPipe } from './pipes/parseFile.pipe';

@Module({
  providers: [FileValidatorsPipe, BodySizeMiddleware],
  exports: [FileValidatorsPipe, BodySizeMiddleware],
})
export class CommonModule {}
