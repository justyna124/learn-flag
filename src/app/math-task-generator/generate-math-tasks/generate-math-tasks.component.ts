import {Component, ElementRef, ViewChild} from '@angular/core';
import {ElasticSearchClientService} from "../../elastic-search-client.service";
import {TaskType} from "../../../_types/task.type";
import {DescriptionType} from "../../../_types/description.type";

@Component({
  selector: 'app-generate-math-tasks',
  templateUrl: './generate-math-tasks.component.html',
  styleUrls: ['./generate-math-tasks.component.scss']
})
export class GenerateMathTasksComponent {
  taskDescrption: string;
  mathOperation: string;
  mathConditions: string;
  storeMessage: DescriptionType;
  tags: Array<string> = [];

  @ViewChild('tagsInput', {static: false}) tagsInput: ElementRef;

  taskVariable: Array<string> = [];

  constructor(private elasticSearchClientService: ElasticSearchClientService) {
  }

  description(value: string) {
    this.taskDescrption = value;

    value.split(' ').forEach((e) => {
      if (e.match("[:]") && e.length === 2) {
        this.taskVariable.push(e);
        this.taskVariable = [...new Set(this.taskVariable)];
      }
    })
  }

  store() {
    if (this.taskDescrption && this.mathConditions && this.mathOperation) {
      const taskRecord: TaskType = {
        taskDescrption: this.taskDescrption,
        mathConditions: this.mathConditions,
        mathOperation: this.mathOperation,
        tags: [...this.tags, 'all']
      };
      this.elasticSearchClientService.addMathTask(taskRecord).then(e => {
        this.storeMessage = {
          message: 'Zapis danych w bazie danych przebiegł pomyślnie.',
          type: 'success'
        }
      }).catch(e => {
        this.storeMessage = {
          message: 'Zapis danych w bazie danych nie przebiegł pomyślnie.',
          type: 'failure'
        }
      })
    }
  }

  assumptions(condition: string) {
    this.mathConditions = condition;
  }

  getTags($tags: any[]) {
    this.tags = $tags;
  }
}
