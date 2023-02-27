import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorite.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/users/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @Auth()
  create(
    @Body() createFavoritesDto: CreateFavoritesDto,
    @GetUser() user: User,
  ) {
    return this.favoritesService.create(createFavoritesDto, user);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.favoritesService.findAll(paginationDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
