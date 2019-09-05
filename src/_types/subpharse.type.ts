export class SubpharseType {
  private readonly element: string;

  private constructor(fragment: string) {
    this.element = fragment;
  }

  static subpharseType(element: string) {
    if (element === '') {
      throw new Error('Flag must be a non empty string.');
    }
    return new SubpharseType(element);
  }

  get getSubPharse(): string {
    return this.element;
  }
}
