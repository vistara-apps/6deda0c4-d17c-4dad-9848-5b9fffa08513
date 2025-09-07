'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { RefreshCw, ExternalLink, Filter } from 'lucide-react';
import { Transaction, Batch } from '@/lib/types';
import { formatAddress, formatAmount, formatTimestamp } from '@/lib/utils';

interface TransactionDashboardProps {
  transactions: Transaction[];
  batches: Batch[];
  onRefresh: () => void;
  isLoading?: boolean;
}

export function TransactionDashboard({ 
  transactions, 
  batches, 
  onRefresh, 
  isLoading = false 
}: TransactionDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(tx => {
    if (filter !== 'all' && tx.status !== filter) return false;
    if (selectedBatch && tx.batchId !== selectedBatch) return false;
    return true;
  });

  const stats = {
    total: transactions.length,
    pending: transactions.filter(tx => tx.status === 'pending').length,
    processing: transactions.filter(tx => tx.status === 'processing').length,
    completed: transactions.filter(tx => tx.status === 'completed').length,
    failed: transactions.filter(tx => tx.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{stats.total}</div>
            <div className="text-sm text-text-secondary">Total</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.pending + stats.processing}</div>
            <div className="text-sm text-text-secondary">Active</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-sm text-text-secondary">Completed</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
            <div className="text-sm text-text-secondary">Failed</div>
          </div>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex gap-2">
              {(['all', 'pending', 'completed', 'failed'] as const).map(status => (
                <Button
                  key={status}
                  variant={filter === status ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
            
            {batches.length > 0 && (
              <select
                value={selectedBatch || ''}
                onChange={(e) => setSelectedBatch(e.target.value || null)}
                className="h-8 rounded-lg border border-border bg-surface px-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Batches</option>
                {batches.map(batch => (
                  <option key={batch.batchId} value={batch.batchId}>
                    {batch.description}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-text-secondary">
                No transactions found
              </div>
            ) : (
              filteredTransactions.map(transaction => (
                <div
                  key={transaction.transactionId}
                  className="p-4 border border-border rounded-lg hover:bg-surface/50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-text-primary capitalize">
                          {transaction.type}
                        </span>
                        <StatusIndicator status={transaction.status} variant="compact" />
                      </div>
                      <div className="text-sm text-text-secondary">
                        {formatTimestamp(transaction.initiatingTimestamp)}
                      </div>
                    </div>
                    
                    {transaction.txHash && (
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Transaction ID:</span>
                      <div className="font-mono text-text-primary">
                        {formatAddress(transaction.transactionId)}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Batch ID:</span>
                      <div className="font-mono text-text-primary">
                        {formatAddress(transaction.batchId)}
                      </div>
                    </div>
                  </div>

                  {transaction.errorMessage && (
                    <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
                      {transaction.errorMessage}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
