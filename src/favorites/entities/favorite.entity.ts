import { Post } from 'src/posts/entities/post.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToMany(() => Post, (post) => post.favorites, {
    cascade: true,
    eager: true,
  })
  posts: Post[];
}
