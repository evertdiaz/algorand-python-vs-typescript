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

  test('register and create asa', async () => {
    const name = 'Champions Corp';
    await appClient.register({ name });
    const result = await appClient.getName({});
    expect(result.return?.valueOf()).toBe(name);

    await appClient.appClient.fundAppAccount(algokit.microAlgos(200_000));
    const asaresult = await appClient.createAsa(
      {},
      {
        sendParams: {
          fee: algokit.microAlgos(2_000),
        },
      }
    );

    expect(asaresult.return).toBeGreaterThan(0);

    await appClient.optIn.optInToApplication({});
    const employee = 'John Doe';
    await appClient.registerEmployee({ name: employee });
    const localresult = await appClient.getEmployeeName({});
    expect(localresult.return?.valueOf()).toBe(employee);
  });
});
