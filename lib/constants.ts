import { TokenInfo, ChainInfo } from './types';

export const SUPPORTED_TOKENS: TokenInfo[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoUrl: '/tokens/eth.png',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6441b8435b662f0E2d0B8A0E4B2B8B0',
    decimals: 6,
    logoUrl: '/tokens/usdc.png',
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoUrl: '/tokens/weth.png',
  },
];

export const SUPPORTED_CHAINS: ChainInfo[] = [
  {
    id: 8453,
    name: 'Base',
    symbol: 'BASE',
    logoUrl: '/chains/base.png',
  },
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: '/chains/ethereum.png',
  },
  {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    logoUrl: '/chains/polygon.png',
  },
];

export const TRANSACTION_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const DEFAULT_SLIPPAGE = 0.5; // 0.5%
export const MAX_RECIPIENTS_PER_BATCH = 50;
export const MIN_TRANSFER_AMOUNT = 0.001;
