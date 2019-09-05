export class FlagType {
  private readonly element: string;

  private constructor(fragment: string) {
    this.element = fragment;
  }

  static flagType(element: string) {
    if (element === '') {
      throw new Error('Flag must be a non empty string.');
    }
    return new FlagType(element);
  }

  get getFlag(): string {
    return this.element;
  }
}
