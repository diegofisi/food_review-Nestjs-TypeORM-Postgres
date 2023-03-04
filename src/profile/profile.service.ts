import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  findOne(id: string) {
    const profile = this.profileRepository.findOneBy({ id });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    return profile;
  }
}
