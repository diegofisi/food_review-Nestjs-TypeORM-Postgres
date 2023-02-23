import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

export class CreateImageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => File)
  files: Express.Multer.File[];
}
