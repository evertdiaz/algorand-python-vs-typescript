import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class DemoTealscript extends Contract {
  /**
   * Adds a and b
   *
   * @param a
   * @param b
   * @returns Result of adding a and b
   */
  sum(a: number, b: number): number {
    return a + b;
  }

  difference(a: number, b: number): number {
    if (a < b) {
      return b - a;
    }
    return a - b;
  }
}
