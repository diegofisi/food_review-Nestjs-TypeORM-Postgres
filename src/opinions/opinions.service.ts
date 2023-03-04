import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/entities/user.entity';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';

@Injectable()
export class OpinionService {
  create(createOpinionDto: CreateOpinionDto, user: User) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  update(id: string, idOpinion: string, updateOpinionDto: UpdateOpinionDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: string, idOpinion: string) {
    return `This action removes a #${id} comment`;
  }
}
