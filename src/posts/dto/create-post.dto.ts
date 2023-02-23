import { Favorite } from 'src/favorites/entities/favorite.entity';
import { PostImage } from 'src/images/entities/image.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Url } from 'url';
import { IsArray, IsInstance, IsUrl } from 'class-validator';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';

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
  @IsString({ each: true })
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsInstance(Favorite, { each: true })
  @IsArray()
  favorites: Favorite[];

  @IsOptional()
  @IsInstance(Comment, { each: true })
  @IsArray()
  comments: Comment[];
}
