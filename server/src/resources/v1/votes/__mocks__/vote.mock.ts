import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { VotesEntity } from '../entity/votes.entity';
import { subjectEntityMock } from '../../subject/__mocks__/subject.mock';

export const voteEntityMock: VotesEntity = {
  id: '00000000-0000-0000-0000-000000000000',
  user: userEntityMock,
  subject: subjectEntityMock,
  answer: true,
  createdAt: new Date(),
};
