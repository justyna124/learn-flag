import {Injectable} from '@angular/core';
import {countries} from './frag-wrapper/learn-flag';
import {FlagType} from '../_types/flag.type';
import {CountryType} from '../_types/country.type';
import {FragmentType} from '../_types/fragment.type';
import {RightWordEntity} from '../_entity/right-word.entity';
import {SubpharseType} from '../_types/subpharse.type';
import {LeftWordEntity} from '../_entity/left-word.entity';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private dictionary: Array<string>;
  private readonly allFragmentMap;

  public constructor() {
    this.dictionary = countries.map((country) => country.name);
    this.allFragmentMap = {};
    this.dictionaryFill();
  }

  private dictionaryFill() {
    this.dictionary.forEach((word) => {
      const parts = this.getAllSubsets(word);
      parts.forEach((part) => {
        this.allFragmentMap[part] = this.allFragmentMap[part] || [];
        this.allFragmentMap[part].push(word);
      });
    });
  }

  private getAllSubsets(word) {
    const result = {};
    for (let startIndex = 0; startIndex < word.length; startIndex++) {
      for (let endIndex = word.length; endIndex > startIndex; endIndex--) {
        result[word.substring(startIndex, endIndex)] = true;
      }
    }
    return Object.keys(result);
  }

  private encode(phrase) {
    const subPhrases = [];
    let startIndex = 0;
    while (startIndex < phrase.length) {
      for (let i = phrase.length; i > startIndex; i--) {
        const subPhrase = phrase.substring(startIndex, i);
        if (this.allFragmentMap[subPhrase]) {
          subPhrases.push({subPhrase, countries: this.allFragmentMap[subPhrase]});
          startIndex += subPhrase.length;
          break;
        } else if (i === startIndex + 1) {
          subPhrases.push({subPhrase});
          startIndex += subPhrase.length;
        }
      }
    }
    return subPhrases;
  }

  private getRandom(array) {
    if (!array) {
      return null;
    }
    return array[(Math.floor((Math.random() * array.length)))];
  }

  private findPlace(inputArray) {
    return inputArray.map((item) => {
      const country = this.getRandom(item.countries);

      if (!country) {
        return item;
      } else {
        const startIndex = country.indexOf(item.subPhrase);
        return {
          country,
          abbrev: countries.find((c) => {
            return c.name === country;
          }).abbrev,
          fragment: [startIndex + 1, startIndex + item.subPhrase.length]
        };
      }
    });
  }

  public encodeMapAndPresent(value) {
    const wordsFragments = [];

    const places = this.findPlace(this.encode(value));
    places.forEach((place) => {
      const country = place.country;

      if (country) {
        const fragment = place.fragment;
        const flag = place.abbrev;
        let flagType;
        let countryType;
        let fragmentType;
        try {
          flagType = FlagType.flagType(flag);
          countryType = CountryType.country(country);
          fragmentType = FragmentType.fragment(fragment);
        } catch (x) {
          flagType = '';
          countryType = '';
          fragmentType = '';
        }
        wordsFragments.push(new RightWordEntity(flagType, countryType, fragmentType));
      } else {
        let subPharseType;
        try {
          subPharseType = SubpharseType.subpharseType(place.subPhrase);
        } catch (x) {
          subPharseType = '';
        }
        wordsFragments.push(new LeftWordEntity(subPharseType));
      }
    });

    return wordsFragments;
  }
}
