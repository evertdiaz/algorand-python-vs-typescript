import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { DemoClient } from '../smart_contracts/artifacts/demo/client'
import { Account, Algodv2, Indexer } from 'algosdk'
import * as algokit from '@algorandfoundation/algokit-utils'

describe('demo contract', () => {
  const localnet = algorandFixture()
  beforeAll(() => {
    algokit.Config.configure({
      debug: true,
      // traceAll: true,
    })
  })
  beforeEach(localnet.beforeEach)

  const deploy = async (account: Account, algod: Algodv2, indexer: Indexer) => {
    const client = new DemoClient(
      {
        resolveBy: 'creatorAndName',
        findExistingUsing: indexer,
        sender: account,
        creatorAddress: account.addr,
      },
      algod,
    )
    await client.deploy({
      onSchemaBreak: 'append',
      onUpdate: 'append',
    })
    return { client }
  }

  test('register and create asa', async () => {
    const { algod, indexer, testAccount } = localnet.context
    const { client } = await deploy(testAccount, algod, indexer)

    const name = 'Champions Corp'
    await client.register({ name })
    const result = await client.getName({})
    expect(result.return?.valueOf()).toBe(name)

    await client.appClient.fundAppAccount(algokit.microAlgos(200_000))
    const asaresult = await client.createAsa(
      {},
      {
        sendParams: {
          fee: algokit.microAlgos(2_000),
        },
      },
    )

    expect(asaresult.return).toBeGreaterThan(0)

    await client.optIn.optIn({})
    const employee = 'John Doe'
    await client.registerEmployee({ name: employee })
    const localresult = await client.getEmployeeName({})
    expect(localresult.return?.valueOf()).toBe(employee)
  })
})
