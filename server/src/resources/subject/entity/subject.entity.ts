import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectCategoryEnum } from '../enum/SubjectCategoryEnum.enum';
import { VotesEntity } from '../../votes/entity/votes.entity';

@Entity({ name: 'subject' })
export class SubjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: SubjectCategoryEnum })
  category: SubjectCategoryEnum;

  @Column()
  description: string;

  @Column()
  activeUntil: Date;

  @OneToMany(() => VotesEntity, (votes) => votes.subject)
  votes: VotesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
