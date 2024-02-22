import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class DemoTealscript extends Contract {
  /**
   * Says Hello World
   *
   * @param word
   * @returns String "Hello, " plus the word value
   */
  sayHello(word: string): string {
    return 'Hello, ' + word;
  }
}
