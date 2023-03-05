import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { User } from 'src/auth/users/entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';
import { Opinion } from './entities/opinion.entity';

@Injectable()
export class OpinionService {
  private readonly logger = new Logger('OpinionService');
  constructor(
    @InjectRepository(Opinion)
    private readonly opinionRepository: Repository<Opinion>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createOpinionDto: CreateOpinionDto,
    reviewId: string,
    user: User,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { commentId } = createOpinionDto;

      if (commentId) {
        console.log(commentId);
        const parentOpinion = await this.opinionRepository.findOneBy({
          id: commentId,
        });
        const childOpinion = this.opinionRepository.create({
          ...createOpinionDto,
          createdBy: user.profile.nickname,
          profileId: user.profile.id,
          parent: parentOpinion,
        });
        await queryRunner.manager.save<Opinion>(parentOpinion);
        await queryRunner.manager.save<Opinion>(childOpinion);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return { ...childOpinion, profileId: user.profile.id };
      }

      const opinion = this.opinionRepository.create({
        ...createOpinionDto,
        createdBy: user.profile.nickname,
        profileId: user.profile.id,
      });
      await queryRunner.manager.save<Opinion>(opinion);
      const review = await this.reviewRepository.findOneBy({ id: reviewId });
      review.opinions.push(opinion);
      await queryRunner.manager.save<Review>(review);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { ...opinion, profileId: user.profile.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.dataSource.manager.getTreeRepository(Opinion).findTrees();
  }

  async update(id: string, updateOpinionDto: UpdateOpinionDto, user: User) {
    try {
      const opinion = await this.opinionRepository.findOneBy({ id });
      if (!opinion) throw new BadRequestException('Comment not found');
      if (user.profile.id !== opinion.profileId)
        throw new BadRequestException('You are not the owner of this comment');
      if (opinion.isActive === false)
        throw new BadRequestException('Comment already deleted');
      opinion.opinion = updateOpinionDto.opinion;
      opinion.updatedAt = new Date();
      return await this.opinionRepository.save(opinion);
    } catch (error) {
      return this.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    try {
      const opinion = await this.opinionRepository.findOneBy({ id });
      if (!opinion) throw new BadRequestException('Comment not found');
      if (user.roles.includes(ValidRoles.admin || ValidRoles.superUser)) {
        opinion.opinion = 'Message was deleted by Admin';
        opinion.updatedAt = new Date();
        opinion.isActive = false;
        return await this.opinionRepository.save(opinion);
      }
      if (user.profile.id !== opinion.profileId)
        throw new BadRequestException('You are not the owner of this comment');
      if (opinion.isActive === false)
        throw new BadRequestException('Comment already deleted');
      opinion.opinion = 'Message was deleted';
      opinion.updatedAt = new Date();
      opinion.isActive = false;
      return await this.opinionRepository.save(opinion);
    } catch (error) {
      return this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
