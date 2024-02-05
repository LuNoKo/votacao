import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entity/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubjectDto } from './dto/createSubject.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  async CreateSubject(createSubject: CreateSubjectDto): Promise<SubjectEntity> {
    return this.subjectRepository.save({
      ...createSubject,
    });
  }

  async GetAllSubjects(): Promise<SubjectEntity[]> {
    return this.subjectRepository.find();
  }

  async GetOneSubjectById(subjectId: string): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new NotFoundException('Pauta não encontrado');
    }
    return subject;
  }

  async GetOneSubjectByIdWithVotes(subjectId: string): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: ['votes', 'users'],
    });

    if (!subject) {
      throw new NotFoundException('Pauta não encontrado');
    }
    return subject;
  }

  // UPDATE

  // DELETE
}
