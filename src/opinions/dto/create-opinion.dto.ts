import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateOpinionDto {
  @IsString()
  @MinLength(1)
  opinion: string;

  @IsUUID()
  @IsOptional()
  commentId: string;
}
