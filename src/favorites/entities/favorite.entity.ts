import { Review } from 'src/reviews/entities/review.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Review, (review) => review.favorites, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  reviews: Review[];
}
