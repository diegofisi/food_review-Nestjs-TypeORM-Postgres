import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OpinionService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/users/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('reviews/:reviewId/opinions')
export class OpinionController {
  constructor(private readonly opinionService: OpinionService) {}

  @Post()
  @Auth()
  create(
    @GetUser() user: User,
    @Body() createOpinionDto: CreateOpinionDto,
    @Param('reviewId', ParseUUIDPipe) reviewId: string,
  ) {
    return this.opinionService.create(createOpinionDto, reviewId, user);
  }

  @Get()
  findOne(@Param('reviewId', ParseUUIDPipe) id: string) {
    return this.opinionService.findAll(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('reviewId', ParseUUIDPipe) id: string,
    @Param('id', ParseUUIDPipe) idOpinion: string,
    @Body() updateOpinionDto: UpdateOpinionDto,
    @GetUser() user: User,
  ) {
    return this.opinionService.update(id, idOpinion, updateOpinionDto);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('reviewId', ParseUUIDPipe) id: string,
    @Param('id', ParseUUIDPipe) idOpinion: string,
    @GetUser() user: User,
  ) {
    return this.opinionService.remove(id, idOpinion);
  }

  @Delete(':id/admin')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  removeComentary(
    @Param('reviewId', ParseUUIDPipe) id: string,
    @Param('id', ParseUUIDPipe) idOpinion: string,
  ) {
    return this.opinionService.remove(id, idOpinion);
  }
}
