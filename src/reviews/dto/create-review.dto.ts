import {
  IsDecimal,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsArray, IsUrl, ValidateNested } from 'class-validator';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { Transform } from 'class-transformer/types/decorators';

export class CreateReviewDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  stars?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsArray()
  @Type(() => CreateImageDto)
  @ValidateNested({ each: true })
  images?: CreateImageDto[];
}
