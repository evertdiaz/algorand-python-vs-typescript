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

  test('sum', async () => {
    const a = 25;
    const b = 29;
    const hello = await appClient.sum({ a, b });
    expect(hello.return?.valueOf()).toEqual(BigInt(54));
  });

  test('difference', async () => {
    const a = 29;
    const b = 25;
    const hello = await appClient.difference({ a, b });
    expect(hello.return?.valueOf()).toEqual(BigInt(4));
  });
});
