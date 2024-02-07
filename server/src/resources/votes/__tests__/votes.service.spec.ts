import { Test, TestingModule } from '@nestjs/testing';
import { expect } from '@jest/globals';
import { VotesService } from '../votes.service';
import { VotesEntity } from '../entity/votes.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { voteEntityMock } from '../__mocks__/vote.mock';
import { UserService } from '../../user/user.service';
import { SubjectService } from '../../subject/subject.service';
import { subjectEntityMock } from '../../subject/__mocks__/subject.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../../auth/__mocks__/jwt.mock';
import { ConflictException } from '@nestjs/common';
import { createVoteMock } from '../__mocks__/createVote.mock';

describe('VotesService', () => {
  let votesService: VotesService;
  let userService: UserService;
  let subjectService: SubjectService;
  let votesRepository: Repository<VotesEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: getRepositoryToken(VotesEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(voteEntityMock),
            save: jest.fn().mockResolvedValue(voteEntityMock),
            HasUserVotedBySubject: jest.fn().mockResolvedValue(true),
            count: jest.fn().mockResolvedValue(10),
          },
        },
        {
          provide: UserService,
          useValue: {
            GetOneUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: SubjectService,
          useValue: {
            GetOneSubjectById: jest.fn().mockResolvedValue(subjectEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sing: jest.fn().mockReturnValue(jwtMock),
          },
        },
      ],
    }).compile();

    votesService = module.get<VotesService>(VotesService);
    userService = module.get<UserService>(UserService);
    subjectService = module.get<SubjectService>(SubjectService);
    votesRepository = module.get<Repository<VotesEntity>>(
      getRepositoryToken(VotesEntity),
    );
  });

  it('should be defined', () => {
    expect(votesService).toBeDefined();
    expect(userService).toBeDefined();
    expect(subjectService).toBeDefined();
    expect(votesRepository).toBeDefined();
  });

  describe('CreateVote', () => {
    it('should return error if user has voted on the subject in CreateVote', async () => {
      expect(
        votesService.CreateVote(createVoteMock, userEntityMock.id),
      ).rejects.toThrow(new ConflictException('Usuário já votou nesta pauta'));
    });
    it('should return vote in CreateVote', async () => {
      jest.spyOn(votesRepository, 'findOne').mockResolvedValue(null);
      expect(
        await votesService.CreateVote(createVoteMock, subjectEntityMock.id),
      ).toEqual(voteEntityMock);
    });
  });

  describe('HasUserVotedBySubject', () => {
    it('should return false if user already voted in HasUserVotedBySubject', async () => {
      jest.spyOn(votesRepository, 'findOne').mockResolvedValue(null);
      expect(
        await votesService.HasUserVotedBySubject(
          userEntityMock.id,
          subjectEntityMock.id,
        ),
      ).toEqual(false);
    });
    it('should return true if user not voted yet in HasUserVotedBySubject', async () => {
      expect(
        await votesService.HasUserVotedBySubject(
          userEntityMock.id,
          subjectEntityMock.id,
        ),
      ).toEqual(true);
    });
  });

  describe('Result', () => {
    it('should return result in HasUserVotedBySubject', async () => {
      expect(await votesService.Result(subjectEntityMock.id)).toEqual({
        votesForNo: 10,
        votesForYes: 10,
      });
    });
  });
});
