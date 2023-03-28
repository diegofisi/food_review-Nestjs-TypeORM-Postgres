import { Module } from '@nestjs/common';
import { BodySizeMiddleware } from './middlewares/bodySize.middleware';
import { FileValidatorsPipe } from './pipes/parseFile.pipe';

@Module({
  providers: [FileValidatorsPipe, BodySizeMiddleware],
  exports: [FileValidatorsPipe, BodySizeMiddleware],
})
export class CommonModule {}
