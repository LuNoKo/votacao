import { Test, TestingModule } from '@nestjs/testing';
import { VotesController } from '../votes.controller';
import { VotesService } from '../votes.service';
import { createVoteMock } from '../__mocks__/createVote.mock';
import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { voteEntityMock } from '../__mocks__/vote.mock';

describe('VotesController', () => {
  let votesController: VotesController;
  let votesService: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: VotesService,
          useValue: { CreateVote: jest.fn().mockResolvedValue(voteEntityMock) },
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
});
