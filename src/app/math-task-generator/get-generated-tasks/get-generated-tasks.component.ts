import {Component, OnInit} from '@angular/core';
import {ElasticSearchClientService} from "../../elastic-search-client.service";
import {TaskType} from "../../../_types/task.type";
import {MatListOption} from "@angular/material/list";
import {randomIntFromInterval} from "../../../_utils/random/random";
import {DescriptionType} from "../../../_types/description.type";

@Component({
  selector: 'app-get-generated-tasks',
  templateUrl: './get-generated-tasks.component.html',
  styleUrls: ['./get-generated-tasks.component.scss']
})
export class GetGeneratedTasksComponent implements OnInit {

  tasks: Array<TaskType> = [];
  selected: Array<TaskType> = [];
  tasksStatus: 'emptyDB' | 'noTasksTags' | 'success';
  moreThan: string;
  lessThan: string;
  description: Array<DescriptionType>;
  tags: Array<any> = ['all'];

  constructor(private elasticSearchClientService: ElasticSearchClientService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks() {
    this.elasticSearchClientService.getByIndex('math-tasks-generated').then((e) => {
      this.tasks = e.hits.hits;
      this.tasksStatus = 'success';
    }).catch(e => {
      this.tasksStatus = 'emptyDB';
    })
  }

  onGroupsChange(options: MatListOption[]) {
    let selected = [];
    options.map(o => o.value).forEach(e => {
      selected = [...selected, this.tasks.filter((p: any) => p._source.description === e)[0]];
    });
    this.selected = selected;
  }

  parseConditionsNumber() {
    return !!(Number(this.lessThan) && Number(this.moreThan) && Number(this.lessThan) > Number(this.moreThan));
  }

  generateTasks() {
    let localDescription = "";
    this.description = [];
    let isSolutionFinding;

    this.selected.forEach((e: any) => {
      localDescription = "";

      isSolutionFinding = false;
      let condition = [];
      let variable = [];

      e._source.description.split(' ').forEach(e => {
        if (e.match("[:]") && e.length === 2) {
          variable.push(e);
          variable = [...new Set(variable)];
        }
      });

      condition = e._source.conditions.split(' ').map((e) =>
        e.match("[:]") && e.length === 2
          ? `variableMap['${e}']` : e
      );

      let variableMap = {};
      variable.forEach(e => {
        variableMap[e] = undefined;
      });

      let i = 0;
      do {
        let randomNumbers = [];
        Object.keys(variableMap).forEach(e => {
          randomNumbers[e] = randomIntFromInterval(this.moreThan, this.lessThan);
          variableMap[e] = randomNumbers[e];
        });

        let evalOperation = undefined;
        try {
          evalOperation = eval(condition.join(" "))
        }
        catch(exception) {
          isSolutionFinding = true;
          this.description.push({
            message: `Znalezienie rozwiązania dla jednego zadania nie powiodło się: ${exception.message}`,
            type: 'failure'
          });
        }

        if (evalOperation) {
          isSolutionFinding = true;

          localDescription = e._source.description;
          Object.keys(randomNumbers).forEach(o => {
            localDescription = localDescription.replace(o, randomNumbers[o])
          });

          this.description.push({
            message: localDescription,
            type: 'success'
          });
        }

        i++;
        if (i === 5000) {
          isSolutionFinding = true;
          this.description.push({
            message: "Znalezienie rozwiązania dla jednego zadania nie powiodło się",
            type: "failure"
          });
        }
      } while(!isSolutionFinding);
    })
  }

  getTags($tags: any[]) {
    $tags.length
      ? this.tags = $tags
      : this.tags = ['all'];

    this.getTasksByTags();
  }

  private getTasksByTags() {
    this.elasticSearchClientService.getByIndexAndTags('math-tasks-generated', this.tags).then((e) => {
      if (e.hits.hits.length) {
        this.tasks = e.hits.hits;
        this.tasksStatus = 'success';
      }
      else {
        this.tasks = [];
        this.tasksStatus = 'noTasksTags';
      }
    }).catch((_e) => {
      this.tasksStatus = 'emptyDB'
    })
  }
}
