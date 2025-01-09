import type { Plugin } from '@elizaos/core';
import { defiLlamaProvider } from './providers/defillama';
import { coinGeckoProvider } from './providers/coingecko';

export const codasPlugin: Plugin = {
  name: 'codas',
  description: 'A plugin for Conflux Network DeFi interactions',
  actions: [],
  providers: [defiLlamaProvider, coinGeckoProvider]
};

export default codasPlugin;

