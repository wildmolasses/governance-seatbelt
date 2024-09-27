/**
 * @notice Sample simulation configuration file for proposals that have been executed on chain.
 */
import { SimulationConfigProposed } from '../types'

export const config: SimulationConfigProposed = {
  type: 'proposed',
  daoName: 'Unlock',
  governorAddress: '0x7757f7f21F5Fa9b1fd168642B79416051cd0BB94',
  governorType: 'oz',
  proposalId: '0x523fa9699192f69b527645a9a072afc1ec937bbf488ec832269904e1d6bb0f25',
}
