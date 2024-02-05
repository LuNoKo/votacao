import { Test, TestingModule } from '@nestjs/testing';
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
import { ConflictException, NotFoundException } from '@nestjs/common';
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
    // TODO
    it('should return error if user not exist in CreateVote', async () => {
      // jest.spyOn(userService, 'GetOneUserById').mockRejectedValue(undefined);
      // expect(jest.spyOn(userService, 'GetOneUserById')).toHaveBeenCalledWith(
      //   '00000000-0000-0000-0000-000000000001',
      // );
      // expect(
      //   votesService.CreateVote(
      //     createVoteMock,
      //     '00000000-0000-0000-0000-000000000001',
      //   ),
      // ).rejects.toThrow(
      //   new NotFoundException('Pauta ou usuário não encontrado'),
      // );
    });
    // TODO
    it('should return error if subject not exist in CreateVote', async () => {
      // jest
      //   .spyOn(subjectService, 'GetOneSubjectById')
      //   .mockRejectedValue(undefined);
      // expect(
      //   votesService.CreateVote(createVoteMock, userEntityMock.id),
      // ).rejects.toThrow();
    });
  });

  describe('HasUserVotedBySubject', () => {
    // TODO
    it('should return false if user already voted in HasUserVotedBySubject', async () => {});
    // TODO
    it('should return true if user not voted yet in HasUserVotedBySubject', async () => {});
    // TODO
    it('should return error if user not exist in HasUserVotedBySubject', async () => {
      // jest.spyOn(userService, 'GetOneUserById').mockRejectedValue(undefined);
      // expect(
      //   await votesService.HasUserVotedBySubject(
      //     userEntityMock.id,
      //     subjectEntityMock.id,
      //   ),
      // ).rejects.toThrow(
      //   new NotFoundException('Pauta ou usuário não encontrado'),
      // );
    });
    // TODO
    it('should return error if subject not exist in HasUserVotedBySubject', async () => {
      return true;
    });
  });
});
