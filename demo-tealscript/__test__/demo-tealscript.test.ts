import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import { DemoTealscriptClient } from '../contracts/clients/DemoTealscriptClient';

const fixture = algorandFixture();
algokit.Config.configure({ populateAppCallResources: true });

let appClient: DemoTealscriptClient;

describe('DemoTealscript', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new DemoTealscriptClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});
  });

  test('says hello', async () => {
    const word = 'World';
    const hello = await appClient.sayHello({ word });
    expect(hello.return?.valueOf()).toBe('Hello, World');
  });
});
