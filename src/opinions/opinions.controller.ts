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

@Controller(':id/opinions')
export class OpinionController {
  constructor(private readonly opinionService: OpinionService) {}

  @Post(':id')
  @Auth()
  create(@Body() createOpinionDto: CreateOpinionDto, @GetUser() user: User) {
    return this.opinionService.create(createOpinionDto, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.opinionService.findOne(id);
  }

  @Patch(':id/opinions/:idOpinion')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('idOpinion', ParseUUIDPipe) idOpinion: string,
    @Body() updateOpinionDto: UpdateOpinionDto,
  ) {
    return this.opinionService.update(id, idOpinion, updateOpinionDto);
  }

  @Delete(':id/opinions/:idOpinion')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('idOpinion', ParseUUIDPipe) idOpinion: string,
  ) {
    return this.opinionService.remove(id, idOpinion);
  }
}
