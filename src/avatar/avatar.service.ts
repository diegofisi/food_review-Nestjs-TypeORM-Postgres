import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from './entities/avatar.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(file: Express.Multer.File, user: User) {
    const profile = await this.getProfile(user);
    const image = new Avatar();
    const bitmap = fs.readFileSync(file.path);
    const base64 = Buffer.from(bitmap).toString('base64');
    image.image = base64;
    if (!profile.avatar) {
      const avatar = await this.avatarRepository.save(image);
      profile.avatar = avatar;
      await this.profileRepository.save(profile);
    }
    profile.avatar.image = image.image;
    await this.profileRepository.save(profile);
  }

  // async update(id: string, user: User) {
  //   const profile = await this.getProfile(user);
  //   const avatar = await this.avatarRepository.findOne({
  //     where: {
  //       id: id,
  //       profile: {
  //         id: profile.id,
  //       },
  //     },
  //   });
  //   if (!avatar) throw new NotFoundException(`Avatar with id: ${id} not found`);
  //   if (avatar) {
  //     profile.avatar = avatar;
  //     await this.avatarRepository.save(profile.avatar);
  //     delete profile.avatar.image;
  //   }
  //   return profile.avatar;
  // }

  // async remove(id: string, user: User) {
  //   const profile = await this.getProfile(user);
  //   const avatar = await this.avatarRepository.find({
  //     where: {
  //       id: id,
  //       profile: {
  //         id: profile.id,
  //       },
  //     },
  //   });

  //   if (!avatar || avatar.length === 0)
  //     throw new NotFoundException(`Product with id: ${id} not found`);

  //   if (avatar && avatar.length > 0) {
  //     await this.avatarRepository.delete(id);
  //     return `Avatar with id: ${id} was deleted`;
  //   }

  //   return 'You are not allowed to delete this avatar';
  // }

  async getProfile(user: User) {
    return await this.profileRepository.findOneBy({ id: user.profile.id });
  }
}
