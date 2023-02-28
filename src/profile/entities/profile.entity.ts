import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  nickname: string;

  // @OneToMany(() => Avatar, (avatar) => avatar.user, {
  //   cascade: true,
  //   eager: true,
  // })
  // avatars: Avatar[];
}
