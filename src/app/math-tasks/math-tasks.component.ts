import {Component} from '@angular/core';
import {MathTasksService} from "../math-tasks.service";
import {MathTasksType} from "../../_types/math-tasks.type";

@Component({
  selector: 'app-math-tasks',
  templateUrl: './math-tasks.component.html',
  styleUrls: ['./math-tasks.component.scss']
})
export class MathTasksComponent {

  array: Array<MathTasksType>;

  constructor(private mathTasksService: MathTasksService) {
    this.generateTasks();
  }

  inputSetValue(id: number, $event: KeyboardEvent) {
    const userNumberRepy = Number((<HTMLInputElement>$event.target).value);
    const currentExpression = this.array.filter(e => e.id === id)[0];

    if (userNumberRepy) {
      currentExpression.userReply = userNumberRepy;
      if (currentExpression.expressionResult === userNumberRepy) {
        currentExpression.status = true;
      }
      else {
        currentExpression.status = false;
      }
    }
    else {
      currentExpression.status = false;
    }

    this.array[id] = currentExpression;
  }

  generateTasks() {
    this.array = this.mathTasksService.generateNewTasks();
  }

  addTasks() {
    this.array = this.mathTasksService.addNewTasks();
  }
}
