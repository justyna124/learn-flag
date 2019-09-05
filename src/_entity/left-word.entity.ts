import {WordType} from '../_types/word.type';
import {SubpharseType} from '../_types/subpharse.type';

export class LeftWordEntity {
  private readonly type: string;
  private readonly subPhrase: string;

  constructor(subPhrase: SubpharseType) {
    this.type = WordType.left;
    this.subPhrase = subPhrase.getSubPharse;
  }

  get getType(): string {
    return this.type;
  }

  get getSubPhrase(): string {
    return this.subPhrase;
  }
}
