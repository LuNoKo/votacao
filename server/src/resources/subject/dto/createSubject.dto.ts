import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinDate,
} from 'class-validator';
import { SubjectCategoryEnum } from '../enum/SubjectCategoryEnum.enum';
import { Transform } from 'class-transformer';

export class CreateSubjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(SubjectCategoryEnum)
  category: SubjectCategoryEnum;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  activeUntil: Date;
}
