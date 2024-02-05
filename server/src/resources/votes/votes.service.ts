import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VotesEntity } from './entity/votes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/createVote.dto';
import { UserService } from '../user/user.service';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(VotesEntity)
    private readonly voteRepository: Repository<VotesEntity>,
    private readonly userService: UserService,
    private readonly subjectService: SubjectService,
  ) {}

  async CreateVote(
    createVote: CreateVoteDto,
    userId: string,
  ): Promise<VotesEntity> {
    if (await this.HasUserVotedBySubject(userId, createVote.subjectId)) {
      throw new ConflictException('Usuário já votou nesta pauta');
    }

    const user = await this.userService.GetOneUserById(userId);

    const subject = await this.subjectService.GetOneSubjectById(
      createVote.subjectId,
    );

    if (!user || !subject) {
      throw new NotFoundException('Pauta ou usuário não encontrado');
    }

    const voteEntity = new VotesEntity();
    voteEntity.user = user;
    voteEntity.subject = subject;
    voteEntity.answer = createVote.answer;

    return await this.voteRepository.save(voteEntity);
  }

  async HasUserVotedBySubject(
    userId: string,
    subjectId: string,
  ): Promise<boolean> {
    const user = await this.userService.GetOneUserById(userId);

    const subject = await this.subjectService.GetOneSubjectById(subjectId);

    if (!user || !subject) {
      throw new NotFoundException('Pauta ou usuário não encontrado');
    }

    const hasUserVoted = await this.voteRepository.findOne({
      where: { user, subject },
    });

    return !!hasUserVoted;
  }
}
