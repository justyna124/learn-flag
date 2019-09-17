import {Injectable} from '@angular/core';
import {Client} from 'elasticsearch-browser';
import {TaskType} from "../_types/task.type";

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchClientService {

  private client: Client;

  constructor() {
    if (!this.client) {
      this.connect();
    }
  }

  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  getByIndex(index: string) {
    return this.client.search({
      index
    });
  }

  getByIndexAndTags(index: string, tags: Array<string>) {
    return this.client.search({
      index,
      body: {
        query: {
          terms: {
            'tags': tags
          }
        }
      }
    })
  }

  addMathTask(taskRecord: TaskType) {
    return this.client.index({
      index: 'math-tasks-generated',
      body: {
        description: taskRecord.taskDescrption,
        conditions: taskRecord.mathConditions,
        operation: taskRecord.mathOperation,
        tags: taskRecord.tags
      }
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'Hello, World!'
    });
  }
}
