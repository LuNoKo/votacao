import { Body, Controller, Get, Head, Param, Post } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/createVote.dto';
import { ReturnVoteDto } from './dto/returnVote.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserTypeEnum } from '../user/enum/userType.enum';
import { UserId } from '../../common/decorators/userId.decorator';
import { ReturnVoteResultDto } from './dto/returnVoteResult.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { authorizationToLoginPayload } from 'src/common/utils/base64converter';

@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @Roles(UserTypeEnum.ADMIN, UserTypeEnum.USER)
  @ApiHeader(authorizationToLoginPayload)
  async CreateVote(
    @Body() createVote: CreateVoteDto,
    @UserId() userId: string,
  ): Promise<ReturnVoteDto> {
    return new ReturnVoteDto(
      await this.votesService.CreateVote(createVote, userId),
    );
  }

  @Get('hasUserVotedBySubject/:subjectId')
  @ApiHeader(authorizationToLoginPayload)
  async HasUserVotedBySubject(
    @Param('subjectId') subjectId: string,
    @UserId() userId: string,
  ): Promise<boolean> {
    return await this.votesService.HasUserVotedBySubject(userId, subjectId);
  }

  @Get('result/:subjectId')
  async Result(
    @Param('subjectId') subjectId: string,
  ): Promise<ReturnVoteResultDto> {
    return new ReturnVoteResultDto(await this.votesService.Result(subjectId));
  }
}
