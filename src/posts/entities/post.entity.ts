import { Comment } from 'src/comments/entities/comment.entity';
import { Url } from 'src/common/urls/entities/url.entity';
import { PostImage } from 'src/images/entities/image.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity({ name: 'posts' })
export class Post {
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

  @OneToMany(() => PostImage, (postImage) => postImage.post, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  images?: PostImage[];

  @ManyToOne(() => Favorite, (favorites) => favorites.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  favorites: Favorite[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  comments: Comment[];
}
