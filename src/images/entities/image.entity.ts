import { Review } from 'src/reviews/entities/review.entity';
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'review_images' })
export class ReviewImage {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  filename: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  image: string;

  @ManyToOne(() => Review, (review) => review.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  review: Review;
}
