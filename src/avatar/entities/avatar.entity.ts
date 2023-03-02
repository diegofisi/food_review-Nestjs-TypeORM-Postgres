import { Transform } from 'class-transformer';
import { User } from 'src/auth/users/entities/user.entity';
import { Profile } from '../../profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'avatars' })
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  image: string;

  @OneToOne(() => Profile, (profile) => profile.avatar, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  // @Transform(({ value }) => {
  //   return value.id;
  // })
  // @ManyToOne(() => User, (user) => user.avatars, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // user: User;
}
