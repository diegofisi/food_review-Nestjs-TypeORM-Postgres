import { Transform } from 'class-transformer';
import { Profile } from 'src/profile/entities/profile.entity';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'opinions' })
@Tree('materialized-path')
export class Opinion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
    default: 'Excelent Review',
  })
  opinion: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    type: 'text',
  })
  createdBy: string;

  @Column({
    type: 'text',
  })
  profileId: string;

  @TreeChildren()
  children: Opinion[];

  @TreeParent()
  parent: Opinion;

  @ManyToOne(() => Review, (review) => review.opinions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  review: Review;
}
