import { Transform } from 'class-transformer';
import { Avatar } from 'src/avatar/entities/avatar.entity';
import { OneToMany } from 'typeorm';
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
  })
  nickname: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles?: string[];

  // @Transform(({ value }) => {
  //   return value.map((image: Avatar) => image.id);
  // })
  @OneToMany(() => Avatar, (avatar) => avatar.user, {
    cascade: true,
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
