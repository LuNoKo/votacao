import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from '../subject.service';
import { SubjectEntity } from '../entity/subject.entity';
import { subjectEntityMock } from '../__mocks__/subject.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

//npm run test ./src/resources/subject/test/subject.service.spec.ts
describe('SubjectService', () => {
  let service: SubjectService;
  let subjectRepository: Repository<SubjectEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: getRepositoryToken(SubjectEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([subjectEntityMock]),
            findOne: jest.fn().mockResolvedValue(subjectEntityMock),
            save: jest.fn().mockResolvedValue(subjectEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
    subjectRepository = module.get<Repository<SubjectEntity>>(
      getRepositoryToken(SubjectEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(subjectRepository).toBeDefined();
  });

  describe('CreateSubject', () => {
    it('should return subject if success in CreateSubject', async () => {
      expect(await service.CreateSubject(subjectEntityMock)).toEqual(
        subjectEntityMock,
      );
    });
  });

  describe('GetAllSubjects', () => {
    it('should return all subjects in GetAllSubjects', async () => {
      expect(await service.GetAllSubjects()).toEqual([subjectEntityMock]);
    });

    it('should return empty array in GetAllSubjects', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValue([]);
      expect(await service.GetAllSubjects()).toEqual([]);
    });

    it('should return empty array in GetAllSubjects', async () => {
      jest.spyOn(subjectRepository, 'find').mockRejectedValue(new Error());
      expect(await service.GetAllSubjects()).rejects.toThrow(new Error());
    });
  });

  describe('GetOneSubjectById', () => {
    it('should return subject in GetOneSubjectById', async () => {
      expect(await service.GetOneSubjectById(subjectEntityMock.id)).toEqual(
        subjectEntityMock,
      );
    });

    it('should return error in GetOneSubjectById', async () => {
      jest.spyOn(subjectRepository, 'findOne').mockResolvedValue(null);

      expect(service.GetOneSubjectById(subjectEntityMock.id)).rejects.toThrow(
        new NotFoundException('Pauta não encontrado'),
      );
    });

    it('should return error in GetOneSubjectById (DataBase Error)', async () => {
      jest
        .spyOn(subjectRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(service.GetOneSubjectById(subjectEntityMock.id)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('GetOneSubjectByIdWithVotes', () => {
    it('should return subject in GetOneSubjectByIdWithVotes', async () => {
      jest
        .spyOn(subjectRepository, 'findOne')
        .mockResolvedValue(subjectEntityMock);

      expect(
        await service.GetOneSubjectByIdWithVotes(subjectEntityMock.id),
      ).toEqual(subjectEntityMock);
    });

    it('should return error in GetOneSubjectByIdWithVotes', async () => {
      jest.spyOn(subjectRepository, 'findOne').mockResolvedValue(null);

      expect(
        service.GetOneSubjectByIdWithVotes(subjectEntityMock.id),
      ).rejects.toThrow(new NotFoundException('Pauta não encontrado'));
    });

    it('should return error in GetOneSubjectByIdWithVotes (DataBase Error)', async () => {
      jest
        .spyOn(subjectRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(
        service.GetOneSubjectByIdWithVotes(subjectEntityMock.id),
      ).rejects.toThrow(new Error());
    });
  });
});
