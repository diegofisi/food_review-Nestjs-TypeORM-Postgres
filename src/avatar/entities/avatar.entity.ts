import { Transform } from 'class-transformer';
import { User } from 'src/auth/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'avatars' })
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  image: string;

  @Transform(({ value }) => {
    return value.id;
  })
  @ManyToOne(() => User, (user) => user.avatars, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
