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

  test('sum and diff', async () => {
    const { algod, indexer, testAccount } = localnet.context
    const { client } = await deploy(testAccount, algod, indexer)

    const sum = await client.sum({ a: 25, b: 29 })

    expect(sum.return).toEqual(BigInt(54))

    const diff = await client.difference({ a: 25, b: 29 })

    expect(diff.return).toEqual(BigInt(4))
  })
})
