import { VotesEntity } from '../entity/votes.entity';

export class ReturnVoteDto {
  constructor(vote: VotesEntity) {
    this.userId = vote.user.id;
    this.subjectId = vote.subject.id;
    this.answer = vote.answer;
  }

  userId: string;
  subjectId: string;
  answer: boolean;
}
