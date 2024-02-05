import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from '../subject.controller';
import { SubjectService } from '../subject.service';
import { createSubjecMock } from '../__mocks__/createSubject.mock';
import { subjectEntityMock } from '../__mocks__/subject.mock';

describe('SubjectController', () => {
  let subjectController: SubjectController;
  let subjectService: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SubjectService,
          useValue: {
            CreateSubject: jest.fn().mockResolvedValue(createSubjecMock),
            GetAllSubjects: jest.fn().mockResolvedValue([createSubjecMock]),
            GetOneSubjectById: jest.fn().mockResolvedValue(createSubjecMock),
          },
        },
      ],
      controllers: [SubjectController],
    }).compile();

    subjectController = module.get<SubjectController>(SubjectController);
    subjectService = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(subjectController).toBeDefined();
    expect(subjectService).toBeDefined();
  });

  describe('CreateSubject', () => {
    it('should return user in CreateSubject', async () => {
      const user = await subjectController.CreateSubject(createSubjecMock);

      expect(user).toEqual({
        title: createSubjecMock.title,
        description: createSubjecMock.description,
        category: createSubjecMock.category,
        activeUntil: createSubjecMock.activeUntil,
      });
    });
  });

  describe('GetAllSubject', () => {
    it('should return array of subjects in GetAllSubject', async () => {
      const subjects = await subjectController.GetAllSubject();

      expect(subjects).toEqual([
        {
          title: createSubjecMock.title,
          description: createSubjecMock.description,
          category: createSubjecMock.category,
          activeUntil: createSubjecMock.activeUntil,
        },
      ]);
    });
  });

  describe('GetOneSubjectById', () => {
    it('should return subject in GetOneSubjectById', async () => {
      const subject = await subjectController.GetOneSubjectById(
        subjectEntityMock.id,
      );

      expect(subject).toEqual({
        title: createSubjecMock.title,
        description: createSubjecMock.description,
        category: createSubjecMock.category,
        activeUntil: createSubjecMock.activeUntil,
      });
    });
  });

  describe('GetAllVotesBySubject', () => {});
});
