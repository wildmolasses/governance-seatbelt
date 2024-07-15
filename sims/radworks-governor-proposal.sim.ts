/**
 * @notice Simulation configuration file for a proposal that does not exist on-chain.
 * This proposal changes the admin of the Radworks timelock to the newly deployed Radworks Governor Bravo.
 */
import { SimulationConfigNew } from '../types'
import { Interface } from '@ethersproject/abi'
import { ERC20_ABI } from '../utils/contracts/erc20'

// Get interfaces to facilitate encoding the calls we want to execute.
const timelockAbi = [
  'function setPendingAdmin(address newPendingAdmin) external',
  // 'function acceptAdmin() external',
]

const governorAbi = ['function __acceptAdmin() public']

const timelockInterface = new Interface(timelockAbi)
const governorInterface = new Interface(governorAbi)
const erc20Interface = new Interface(ERC20_ABI)

// Define the parameters for each action.
const call1 = {
  target: '0x31c8EAcBFFdD875c74b94b077895Bd78CF1E64A3', // RAD token contract.
  calldata: erc20Interface.encodeFunctionData('transfer', [
    '0x5C04E7808455ee0e22c2773328C151d0DD79dC62', // Address to transfer to
    8065000000000000000000, // amount
  ]),
  value: 0,
  signature: '',
}

const call2 = {
  target: '0x8dA8f82d2BbDd896822de723F55D6EdF416130ba', // Radworks timelock.
  calldata: timelockInterface.encodeFunctionData('setPendingAdmin', [
    '0xD64D01D04498bFc60f04178e0B62a757C5048212', // new Radworks Governor Bravo
  ]),
  value: 0,
  signature: '',
}

const call3 = {
  target: '0xD64D01D04498bFc60f04178e0B62a757C5048212', // new Radworks Governor Bravo
  calldata: governorInterface.encodeFunctionData('__acceptAdmin', []),
  value: 0,
  signature: '',
}

const calls = [call1, call2, call3]

export const config: SimulationConfigNew = {
  type: 'new',
  daoName: 'Radworks',
  governorAddress: '0x690e775361AD66D1c4A25d89da9fCd639F5198eD',
  targets: calls.map((call) => call.target), // Array of targets to call.
  values: calls.map((call) => call.value), // Array of values with each call.
  signatures: calls.map((call) => call.signature), // Array of function signatures. Leave empty if generating calldata with ethers like we do here.
  calldatas: calls.map((call) => call.calldata), // Array of encoded calldatas.
  description: 'Change Radworks Timelock admin to Radworks Governor Bravo',
}
