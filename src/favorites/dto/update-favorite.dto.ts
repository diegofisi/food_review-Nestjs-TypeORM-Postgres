import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritesDto } from './create-favorite.dto';

export class UpdateFavoriteDto extends PartialType(CreateFavoritesDto) {}
