import { Transform, Type } from 'class-transformer';
import { Avatar } from 'src/avatar/entities/avatar.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { JoinColumn, OneToMany, OneToOne } from 'typeorm';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  lastname: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'text',
    default: 'Reviewer',
  })
  nickname: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => Favorite, (favorite) => favorite.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  favorites: Favorite;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles?: string[];

  @OneToOne(() => Avatar, (avatar) => avatar.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  avatar: Avatar;

  @OneToMany(() => Avatar, (avatar) => avatar.user, {
    cascade: true,
    eager: true,
  })
  avatars: Avatar[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase();
  }
}
