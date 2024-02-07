import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty({
    example: '00000000-0000-0000-0000-000000000000',
    description:
      'SubjectId é uma GUID utilizada para referenciar o assunto que esta no banco de dados',
  })
  @IsNotEmpty()
  @IsString()
  subjectId: string;

  @ApiProperty({
    example: true,
    description: 'Answer é o voto',
  })
  @IsNotEmpty()
  @IsBoolean()
  answer: boolean;
}
