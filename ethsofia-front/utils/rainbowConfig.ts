import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,  
} from 'wagmi/chains';

const iexec = {
  id: 134,
  name: 'iExec Bellecour',
  iconUrl: 'https://whatthelogo.com/storage/logos/iexec-rlc-112398.png',
  iconBackground: '#000000',
  nativeCurrency: { name: 'xRLC', symbol: 'xRLC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://bellecour.iex.ec'] },
  },
  blockExplorers: {
    default: { name: 'BlockScout', url: 'https://blockscout-bellecour.iex.ec/' },
  },
  testnet: false,
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    iexec,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [iexec] : []),
  ],
  ssr: true,
});