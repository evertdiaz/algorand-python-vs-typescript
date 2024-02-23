import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class DemoTealscript extends Contract {
  companyName = GlobalStateKey<string>();

  /**
   * Register the name of the company
   *
   * @param name
   */
  register(name: string): void {
    this.companyName.value = name;
  }

  /**
   * Retrieves the registered name
   *
   * @param name
   * @returns Name of the company
   */
  getName(): string {
    return this.companyName.value;
  }
}
