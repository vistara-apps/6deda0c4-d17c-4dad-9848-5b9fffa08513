export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress: string;
  creationDate: Date;
}

export interface Template {
  templateId: string;
  userId: string;
  name: string;
  type: 'transfer' | 'swap';
  config: TransferConfig | SwapConfig;
  createdAt: Date;
}

export interface TransferConfig {
  token: string;
  recipients: Array<{
    address: string;
    amount: string;
    label?: string;
  }>;
}

export interface SwapConfig {
  fromToken: string;
  toToken: string;
  fromChain: string;
  toChain: string;
  amount: string;
  slippageTolerance: number;
}

export interface Transaction {
  transactionId: string;
  userId: string;
  templateId?: string;
  type: 'transfer' | 'swap';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  batchId: string;
  initiatingTimestamp: Date;
  completionTimestamp?: Date;
  txHash?: string;
  errorMessage?: string;
}

export interface Batch {
  batchId: string;
  userId: string;
  description: string;
  creationTimestamp: Date;
  totalTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
}

export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface TokenInfo {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoUrl?: string;
  balance?: string;
}

export interface ChainInfo {
  id: number;
  name: string;
  symbol: string;
  logoUrl?: string;
}
