export class CountryType {
  private readonly element: string;

  private constructor(fragment: string) {
    this.element = fragment;
  }

  static country(element: string) {
    if (element === '') {
      throw new Error('Country must be a non empty string.');
    }
    return new CountryType(element);
  }

  get getCountry(): string {
    return this.element;
  }
}
