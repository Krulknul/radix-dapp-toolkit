import './style.css'
import { RadixDappToolkit } from '../src/radix-dapp-toolkit'
import { Logger } from 'tslog'

const rdt = RadixDappToolkit(
  { dAppDefinitionAddress: 'acc_123abc', dAppName: 'Test dApp' },
  (requestData) => {
    requestData({
      accounts: { quantifier: 'atLeast', quantity: 1 },
    }).map(({ data: { accounts } }) => {
      // add accounts to dApp application state
    })
  },
  {
    logger: new Logger(),
    networkId: 34,
    onDisconnect: () => {},
  }
)

document.body.appendChild(document.createElement('radix-connect-button'))

const sendTx = (address: string) => {
  const faucet =
    'component_tdx_b_1qftacppvmr9ezmekxqpq58en0nk954x0a7jv2zz0hc7qdxyth4'
  return rdt.sendTransaction({
    version: 1,
    transactionManifest: `
      CALL_METHOD ComponentAddress("${faucet}") "free";
      CALL_METHOD ComponentAddress("${address}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
  })
}
