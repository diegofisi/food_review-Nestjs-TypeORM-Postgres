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
  findAll() {
    return this.opinionService.findAll();
  }

  @Patch(':id')
  @Auth()
  update(
    @GetUser() user: User,
    @Body() updateOpinionDto: UpdateOpinionDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.opinionService.update(id, updateOpinionDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.opinionService.remove(id, user);
  }
}
