import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOpinionDto {
  @IsString()
  @IsOptional()
  opinion: string;

  @IsUUID()
  @IsOptional()
  commentId: string;
}
