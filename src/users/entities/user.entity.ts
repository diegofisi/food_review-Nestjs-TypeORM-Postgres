import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  nombre: string;

  @Column({
    type: 'text',
  })
  apellido: string;

  @Column({
    type: 'text',
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
}
