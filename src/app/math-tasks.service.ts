import {Injectable} from '@angular/core';
import {MathTasksType} from '../_types/math-tasks.type';
import {randomIntFromInterval} from '../_utils/random/random';

@Injectable({
  providedIn: 'root'
})
export class MathTasksService {

  private operators = ['+', '-'];
  private tasks: Array<MathTasksType> = [];

  constructor() { }

  public executeExpression(operator: string) {
    switch (operator) {
      case '+': return (firstNumber, lastNumber) => firstNumber + lastNumber;
      case '-': return (firstNumber, lastNumber) => firstNumber - lastNumber;
    }
  }

  private generateTasks() {
    for (let i = 0; i <= 9; i++) {
      const firstNumber = randomIntFromInterval(0, 100);
      const secondNumber = randomIntFromInterval(0, 100);
      const operator = this.operators[randomIntFromInterval(0, this.operators.length - 1)];
      const expressionResult = this.executeExpression(operator)(firstNumber, secondNumber);

      this.tasks = [...this.tasks, {
        id: i, firstNumber, secondNumber, expressionResult, userReply: undefined, operator, status: undefined
      }];
    }
    return this.tasks;
  }

  generateNewTasks() {
    this.tasks = [];
    return this.generateTasks();
  }

  addNewTasks() {
    return this.generateTasks();
  }
}
