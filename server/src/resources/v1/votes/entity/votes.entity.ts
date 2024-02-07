import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { SubjectEntity } from '../../subject/entity/subject.entity';

@Entity({ name: 'votes' })
export class VotesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.votes)
  user: UserEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.votes)
  subject: SubjectEntity;

  @Column({ nullable: false })
  answer: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
