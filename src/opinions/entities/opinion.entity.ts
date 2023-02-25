import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'opinions' })
export class Opinion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
    default: 'Excelent Review',
  })
  opinion: string;

  @ManyToOne(() => Review, (review) => review.opinions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  review: Review;
}
