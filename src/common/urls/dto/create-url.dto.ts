import { IsOptional, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  @IsOptional()
  url?: string = '';
}
