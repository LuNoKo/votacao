import { Body, Controller, Post } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/createVote.dto';
import { ReturnVoteDto } from './dto/returnVote.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserTypeEnum } from '../user/enum/userType.enum';
import { UserId } from '../../common/decorators/userId.decorator';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @Roles(UserTypeEnum.ADMIN, UserTypeEnum.USER)
  async CreateVote(
    @Body() createVote: CreateVoteDto,
    @UserId() userId: string,
  ): Promise<ReturnVoteDto> {
    return new ReturnVoteDto(
      await this.votesService.CreateVote(createVote, userId),
    );
  }
}
