import { IsDate, IsEnum, IsNotEmpty, IsString, MinDate } from 'class-validator';
import { SubjectCategoryEnum } from '../enum/SubjectCategoryEnum.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({
    example: 'Titulo teste',
    description: 'Title é o titulo da pauta',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Descrição teste',
    description: 'Description é a descrição da pauta onde se encontra o texto',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'GAMES',
    description: 'Category é a categoria em que a pauta se encontra',
    enum: SubjectCategoryEnum,
  })
  @IsEnum(SubjectCategoryEnum)
  category: SubjectCategoryEnum;

  @ApiProperty({
    example: new Date(),
    description: 'ActiveUntil é até quando a pauta irá ficar ativa',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  activeUntil: Date;
}
