import { User } from 'src/auth/users/entities/user.entity';
import { ReviewImage } from 'src/images/entities/image.entity';
import { Opinion } from 'src/opinions/entities/opinion.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

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
    cascade: true,
    eager: true,
    nullable: true,
  })
  opinions: Opinion[];
}
