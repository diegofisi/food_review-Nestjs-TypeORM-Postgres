import { Type } from 'class-transformer';
import { IsString, MinLength, IsArray, ValidateNested } from 'class-validator';

export class CreateAvatarDto {
  @IsArray()
  @Type(() => File)
  @ValidateNested({ each: true })
  files: Express.Multer.File[];
}
