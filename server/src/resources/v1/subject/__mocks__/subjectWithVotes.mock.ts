import { voteEntityMock } from '../../votes/__mocks__/vote.mock';
import { SubjectEntity } from '../entity/subject.entity';
import { SubjectCategoryEnum } from '../enum/SubjectCategoryEnum.enum';

export const subjectEntityMock: SubjectEntity = {
  id: '00000000-0000-0000-0000-000000000000',
  title: 'Teste titulo pauta',
  category: SubjectCategoryEnum.FINANCE,
  description: 'Teste descrição pauta',
  activeUntil: new Date(new Date().setDate(new Date().getDate() + 1)),
  votes: [voteEntityMock],
  createdAt: new Date(),
  updatedAt: new Date(),
};
