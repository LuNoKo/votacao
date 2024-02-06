import { Test, TestingModule } from '@nestjs/testing';
import { VotesController } from '../votes.controller';
import { VotesService } from '../votes.service';
import { createVoteMock } from '../__mocks__/createVote.mock';
import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { voteEntityMock } from '../__mocks__/vote.mock';
import { subjectEntityMock } from '../../subject/__mocks__/subject.mock';
import { ReturnVoteResultMock } from '../__mocks__/returnVoteResult.mock';

describe('VotesController', () => {
  let votesController: VotesController;
  let votesService: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: VotesService,
          useValue: {
            CreateVote: jest.fn().mockResolvedValue(voteEntityMock),
            HasUserVotedBySubject: jest.fn().mockResolvedValue(true),
            Result: jest.fn().mockResolvedValue({
              votesForYes: 10,
              votesForNo: 10,
            }),
          },
        },
      ],
      controllers: [VotesController],
    }).compile();

    votesController = module.get<VotesController>(VotesController);
    votesService = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(votesController).toBeDefined();
    expect(votesService).toBeDefined();
  });

  describe('CreateVote', () => {
    it('should return vote in CreateVote', async () => {
      const user = await votesController.CreateVote(
        createVoteMock,
        userEntityMock.id,
      );

      expect(user).toEqual({
        userId: userEntityMock.id,
        subjectId: createVoteMock.subjectId,
        answer: createVoteMock.answer,
      });
    });
  });

  describe('HasUserVotedBySubject', () => {
    it('should return true in CreateVote', async () => {
      expect(
        await votesController.HasUserVotedBySubject(
          subjectEntityMock.id,
          userEntityMock.id,
        ),
      ).toEqual(true);
    });
  });

  describe('Result', () => {
    it('should return vote in CreateVote', async () => {
      await votesController.Result(subjectEntityMock.id);

      expect(await votesController.Result(subjectEntityMock.id)).toEqual(
        ReturnVoteResultMock,
      );
    });
  });
});
