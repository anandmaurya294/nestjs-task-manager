import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});
const mockUser = {
  username: 'kobe',
  id: 'some id',
  password: 'some password',
  tasks: [],
};
describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksResposiotry;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksResposiotry = module.get(TaskRepository);
  });
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksResposiotry.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
  describe('get task by id ', () => {
    it('calls TaskRepository.findone and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'Some id',
        status: TaskStatus.OPEN,
      };
      tasksResposiotry.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTasksById('Some id', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TaskRepository.findone and handles the error ', async () => {
      tasksResposiotry.findOne.mockResolvedValue(null);
      expect(tasksService.getTasksById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
