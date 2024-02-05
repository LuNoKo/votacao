import { SubjectEntity } from '../entity/subject.entity';
import { SubjectCategoryEnum } from '../enum/SubjectCategoryEnum.enum';

export class ReturnSubjectDto {
  constructor(subject: SubjectEntity) {
    this.id = subject.id;
    this.title = subject.title;
    this.description = subject.description;
    this.category = subject.category;
    this.activeUntil = subject.activeUntil;
  }

  id: string;
  title: string;
  description: string;
  category: SubjectCategoryEnum;
  activeUntil: Date;
}
