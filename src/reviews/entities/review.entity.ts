import { User } from 'src/auth/users/entities/user.entity';
import { ReviewImage } from 'src/images/entities/image.entity';
import { Opinion } from 'src/opinions/entities/opinion.entity';
import {
  Column,
  Entity,
  ManyToMany,
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

  // @Column({
  //   type: 'text',
  //   nullable: true,
  // })
  // createdBy?: User;

  // @Column({
  //   type: 'text',
  //   nullable: true,
  // })
  // updatedBy?: User;

  // @Column({
  //   type: 'text',
  //   nullable: true,
  // })
  // deletedAt: Date;

  @ManyToMany(() => Favorite, (favorite) => favorite.reviews, {
    nullable: true,
  })
  favorites: Favorite[];

  @OneToMany(() => ReviewImage, (postImage) => postImage.review, {
    cascade: true,
    eager: true,
  })
  images?: ReviewImage[];

  @OneToMany(() => Opinion, (opinion) => opinion.review, {
    eager: true,
    nullable: true,
  })
  opinions: Opinion[];
}
