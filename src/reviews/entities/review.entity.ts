import { ReviewImage } from 'src/images/entities/image.entity';
import { Opinion } from 'src/opinions/entities/opinion.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from '../../favorites/entities/favorite.entity';

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

  @OneToMany(() => ReviewImage, (postImage) => postImage.review, {
    cascade: true,
    eager: true,
  })
  images?: ReviewImage[];

  @ManyToOne(() => Favorite, (favorites) => favorites.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  favorites: Favorite[];

  @OneToMany(() => Opinion, (opinion) => opinion.review, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  opinions: Opinion[];
}
