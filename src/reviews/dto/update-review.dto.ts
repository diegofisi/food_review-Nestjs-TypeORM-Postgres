import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-review.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
