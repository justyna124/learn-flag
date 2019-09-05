export class FragmentType {
  private readonly element: string;

  private constructor(fragment: string) {
    this.element = fragment;
  }

  static fragment(element: string) {
    if (element === '') {
      throw new Error('Fragment must be a non empty string.');
    }
    return new FragmentType(element);
  }

  get getFragment(): string {
    return this.element;
  }
}
