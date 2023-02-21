import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'post_images' })
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  image: string;

  @ManyToOne(() => Post, (post) => post.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;
}
