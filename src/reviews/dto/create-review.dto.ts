import { Favorite } from 'src/favorites/entities/favorite.entity';
import { IsArray, IsInstance, IsUrl, IsUUID } from 'class-validator';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Opinion } from 'src/opinions/entities/opinion.entity';
import { ReviewImage } from 'src/images/entities/image.entity';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  stars?: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsOptional()
  @IsArray()
  @IsInstance(ReviewImage, { each: true })
  images?: ReviewImage[];

  @IsOptional()
  @IsInstance(Favorite, { each: true })
  @IsArray()
  favorites: Favorite[];

  @IsOptional()
  @IsInstance(Opinion, { each: true })
  @IsArray()
  opinions: Opinion[];
}
