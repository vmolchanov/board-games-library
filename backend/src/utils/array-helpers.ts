import {NumberHelpers} from './number-helpers';

export class ArrayHelpers {
  static shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  static getRandomElement<T>(array: T[]): T {
    const index = NumberHelpers.random(0, array.length);
    return array[index];
  }
}
