import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {WordType} from '../../_types/word.type';
import {GameService} from '../game.service';

@Component({
  selector: 'app-frag-wrapper',
  templateUrl: './frag-wrapper.component.html',
  styleUrls: ['./frag-wrapper.component.scss']
})
export class FragWrapperComponent implements OnChanges {

  @Input()
  public words;
  public parseWords: Array<string>;

  constructor(private flag: GameService) {
    this.parseWords = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    const words = changes.words;
    const currentWords = words.currentValue;

    if (!!words && !!currentWords) {
      this.parseWords = this.flag.encodeMapAndPresent(currentWords);
    }
  }

  private checkType(word: any) {
    return word.type === WordType.right;
  }

  private getFragment(word: any) {
    const country = word.getCountry;
    const fragment = word.getFragment;

    return [...country].map((partialCountryElement, partialCountryIndex) => {
      if (partialCountryIndex + 1 === fragment[0]
        || partialCountryIndex + 1 === fragment[1]
        || (partialCountryIndex + 1 > fragment[0] && partialCountryIndex + 1 < fragment[1])) {
        return `<strong>${partialCountryElement}</strong>`;
      } else {
        return partialCountryElement;
      }
    }).join('');
  }

  private getFlag(word: any) {
    return `/assets/images/flags/4x3/${word.getFlag}.svg`;
  }
}
