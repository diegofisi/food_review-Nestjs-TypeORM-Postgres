import { IsOptional, IsString } from 'class-validator';

export class CreateOpinionDto {
  @IsString()
  @IsOptional()
  opinion: string;
}
