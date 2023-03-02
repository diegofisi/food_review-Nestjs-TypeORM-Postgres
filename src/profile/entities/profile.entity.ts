import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { Avatar } from 'src/avatar/entities/avatar.entity';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    default: 'Reviewer',
  })
  nickname: string;

  @OneToOne(() => Avatar, (avatar) => avatar.profile, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  avatar: Avatar;

  // @OneToOne(() => Favorite, (favorite) => favorite.user, {
  //   cascade: true,
  //   eager: true,
  // })
  // @JoinColumn()
  // favorites: Favorite;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  // @OneToMany(() => Avatar, (avatar) => avatar.user, {
  //   cascade: true,
  //   eager: true,
  // })
  // avatars: Avatar[];
}
