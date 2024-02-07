import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeEnum } from '../enum/userType.enum';
import { VotesEntity } from '../../votes/entity/votes.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'enum', enum: UserTypeEnum })
  type: UserTypeEnum;

  @Column({ default: true })
  active: boolean;

  @Column()
  password: string;

  @OneToMany(() => VotesEntity, (votes) => votes.user)
  votes: VotesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
