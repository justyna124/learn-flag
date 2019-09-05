import {CountryType} from '../_types/country.type';
import {FlagType} from '../_types/flag.type';
import {FragmentType} from '../_types/fragment.type';
import {WordType} from '../_types/word.type';

export class RightWordEntity {
  private readonly type: string;
  private readonly flag: string;
  private readonly country: string;
  private readonly fragment: string;

  constructor(flag: FlagType, country: CountryType, fragment: FragmentType) {
    this.type = WordType.right;
    this.flag = flag.getFlag;
    this.country = country.getCountry;
    this.fragment = fragment.getFragment;
  }

  get getFlag(): string {
    return this.flag;
  }

  get getCountry(): string {
    return this.country;
  }

  get getFragment(): string {
    return this.fragment;
  }
}
