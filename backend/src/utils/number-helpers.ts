export class NumberHelpers {
  static random(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min));
  }
}
