import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/createSubject.dto';
import { ReturnSubjectDto } from './dto/returnSubject.dto';
import { ReturnSubjectWithVotesDto } from './dto/returnSubjectWithVotes.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserTypeEnum } from '../../resources/user/enum/userType.enum';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @Roles(UserTypeEnum.ADMIN, UserTypeEnum.USER)
  @UsePipes(ValidationPipe)
  async CreateSubject(
    @Body() createSubject: CreateSubjectDto,
  ): Promise<ReturnSubjectDto> {
    return new ReturnSubjectDto(
      await this.subjectService.CreateSubject(createSubject),
    );
  }

  @Get()
  async GetAllSubject(): Promise<ReturnSubjectDto[]> {
    return (await this.subjectService.GetAllSubjects()).map(
      (subject) => new ReturnSubjectDto(subject),
    );
  }

  @Get(':subjectId')
  async GetOneSubjectById(
    @Param('subjectId') subjectId: string,
  ): Promise<ReturnSubjectDto> {
    return new ReturnSubjectDto(
      await this.subjectService.GetOneSubjectById(subjectId),
    );
  }

  @Get('allVotes/:subjectId')
  async GetAllVotesBySubject(
    @Param('subjectId') subjectId: string,
  ): Promise<ReturnSubjectWithVotesDto> {
    return new ReturnSubjectWithVotesDto(
      await this.subjectService.GetOneSubjectByIdWithVotes(subjectId),
    );
  }
}
