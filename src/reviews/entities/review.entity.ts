import { ReviewImage } from 'src/images/entities/image.entity';
import { Opinion } from 'src/opinions/entities/opinion.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'float',
    default: 0,
  })
  stars?: number;

  @Column({
    type: 'text',
    nullable: true,
    default: 'sin descripción',
  })
  description?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  url?: string;

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
    type: 'uuid',
  })
  createdBy: string;

  @ManyToOne(() => Profile, (profile) => profile.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => ReviewImage, (postImage) => postImage.review, {
    cascade: true,
    eager: true,
  })
  images?: ReviewImage[];

  @OneToMany(() => Opinion, (opinion) => opinion.review, {
    cascade: true,
    nullable: true,
  })
  opinions: Opinion[];
}
