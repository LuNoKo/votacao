import { CreateSubjectDto } from '../dto/createSubject.dto';
import { SubjectCategoryEnum } from '../enum/SubjectCategoryEnum.enum';

export const createSubjecMock: CreateSubjectDto = {
  title: 'Teste titulo pauta',
  description: 'Teste descrição pauta',
  category: SubjectCategoryEnum.FINANCE,
  activeUntil: new Date(new Date().setDate(new Date().getDate() + 1)),
};
