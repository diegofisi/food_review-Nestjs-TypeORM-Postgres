import { IsArray, IsUUID } from 'class-validator';

export class CreateFavoritesDto {
  @IsUUID()
  @IsArray({ each: true })
  reviews: string[];
}
