import {TestBed} from '@angular/core/testing';

import {MathTasksService} from './math-tasks.service';

describe('MathTasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathTasksService = TestBed.get(MathTasksService);
    expect(service).toBeTruthy();
  });

  it('should return array of exercises', () => {
    const service: MathTasksService = TestBed.get(MathTasksService);
    const excercises = service.generateNewTasks();
    expect(excercises.length).toEqual(10);
  });

  it('should generate tasks, add new and return array size equal to 20', () => {
    const service: MathTasksService = TestBed.get(MathTasksService);
    service.generateNewTasks();
    const excercises = service.addNewTasks();
    expect(excercises.length).toEqual(20);
  });

  it('should return array which each array element consists of 7 fields', () => {
    const service: MathTasksService = TestBed.get(MathTasksService);
    const excercises = service.generateNewTasks();
    excercises.forEach((e) => {
      expect(Object.keys(e).length).toEqual(7);
    })
  });

  it('should generate tasks and contains fields', () => {
    const service: MathTasksService = TestBed.get(MathTasksService);
    const excercises = service.generateNewTasks();
    excercises.forEach((e) => {
      expect(e.id).toEqual(jasmine.any(Number));
      expect(e.firstNumber).toEqual(jasmine.any(Number));
      expect(e.secondNumber).toEqual(jasmine.any(Number));
      expect(e.expressionResult).toEqual(jasmine.any(Number));
      expect(typeof(e.userReply)).toEqual('undefined');
      expect(e.operator).toEqual(jasmine.any(String));
      expect(typeof(e.status)).toEqual('undefined');
    })
  });

  it('should call executeExpression with + operator, numbers and should add ', () => {
    const service: MathTasksService = TestBed.get(MathTasksService);
    expect(service.executeExpression('+')(10, 10)).toEqual(20);
    expect(service.executeExpression('+')(8, 6)).toEqual(14);
  });

  it('should call executeExpression with + operator, numbers and should subtract ', () => {
    const service: MathTasksService = TestBed.get(MathTasksService);
    expect(service.executeExpression('-')(10, 10)).toEqual(0);
    expect(service.executeExpression('-')(6, 8)).toEqual(-2);
  });
});
