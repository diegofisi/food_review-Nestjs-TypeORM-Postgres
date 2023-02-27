import { User } from 'src/auth/users/entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToMany(() => Review, (review) => review.favorites, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  // @OneToMany(() => Review, (review) => review.favorites, {
  //   cascade: true,
  //   eager: true,
  //   nullable: true,
  // })
  // reviews: Review[];
}
