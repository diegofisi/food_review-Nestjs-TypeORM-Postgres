import { IsUUID } from 'class-validator';

export class DeleteFavoriteDto {
  @IsUUID()
  review: string;
}
