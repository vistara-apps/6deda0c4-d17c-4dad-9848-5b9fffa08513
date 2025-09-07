'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/layout/Header';
import { BatchTransferForm } from '@/components/features/BatchTransferForm';
import { SwapForm } from '@/components/features/SwapForm';
import { TransactionDashboard } from '@/components/features/TransactionDashboard';
import { TemplateManager } from '@/components/features/TemplateManager';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowRightLeft, Send, History, BookOpen, TrendingUp } from 'lucide-react';
import { 
  Template, 
  Transaction, 
  Batch, 
  TransferConfig, 
  SwapConfig 
} from '@/lib/types';
import { generateId } from '@/lib/utils';

type ActiveView = 'dashboard' | 'transfer' | 'swap' | 'history' | 'templates';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Mock data for demonstration
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        transactionId: generateId(),
        userId: 'user1',
        type: 'transfer',
        status: 'completed',
        batchId: 'batch1',
        initiatingTimestamp: new Date(Date.now() - 3600000),
        completionTimestamp: new Date(Date.now() - 3500000),
        txHash: '0x1234567890abcdef',
      },
      {
        transactionId: generateId(),
        userId: 'user1',
        type: 'swap',
        status: 'processing',
        batchId: 'batch2',
        initiatingTimestamp: new Date(Date.now() - 1800000),
      },
      {
        transactionId: generateId(),
        userId: 'user1',
        type: 'transfer',
        status: 'failed',
        batchId: 'batch3',
        initiatingTimestamp: new Date(Date.now() - 900000),
        errorMessage: 'Insufficient gas fee',
      },
    ];

    const mockBatches: Batch[] = [
      {
        batchId: 'batch1',
        userId: 'user1',
        description: 'Weekly Payroll',
        creationTimestamp: new Date(Date.now() - 3600000),
        totalTransactions: 5,
        completedTransactions: 5,
        failedTransactions: 0,
      },
      {
        batchId: 'batch2',
        userId: 'user1',
        description: 'ETH to USDC Swap',
        creationTimestamp: new Date(Date.now() - 1800000),
        totalTransactions: 1,
        completedTransactions: 0,
        failedTransactions: 0,
      },
    ];

    const mockTemplates: Template[] = [
      {
        templateId: generateId(),
        userId: 'user1',
        name: 'Weekly Team Payment',
        type: 'transfer',
        config: {
          token: 'USDC',
          recipients: [
            { address: '0x1234567890123456789012345678901234567890', amount: '1000', label: 'Alice' },
            { address: '0x2345678901234567890123456789012345678901', amount: '1500', label: 'Bob' },
          ],
        } as TransferConfig,
        createdAt: new Date(Date.now() - 86400000),
      },
    ];

    setTransactions(mockTransactions);
    setBatches(mockBatches);
    setTemplates(mockTemplates);
  }, []);

  const handleBatchTransfer = async (config: TransferConfig) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const batchId = generateId();
      const newBatch: Batch = {
        batchId,
        userId: 'user1',
        description: `Batch Transfer - ${config.recipients.length} recipients`,
        creationTimestamp: new Date(),
        totalTransactions: config.recipients.length,
        completedTransactions: 0,
        failedTransactions: 0,
      };

      const newTransactions: Transaction[] = config.recipients.map(recipient => ({
        transactionId: generateId(),
        userId: 'user1',
        type: 'transfer',
        status: 'pending' as const,
        batchId,
        initiatingTimestamp: new Date(),
      }));

      setBatches(prev => [newBatch, ...prev]);
      setTransactions(prev => [...newTransactions, ...prev]);
      setActiveView('history');
    } catch (error) {
      console.error('Batch transfer failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = async (config: SwapConfig) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const batchId = generateId();
      const newBatch: Batch = {
        batchId,
        userId: 'user1',
        description: `Swap ${config.fromToken} to ${config.toToken}`,
        creationTimestamp: new Date(),
        totalTransactions: 1,
        completedTransactions: 0,
        failedTransactions: 0,
      };

      const newTransaction: Transaction = {
        transactionId: generateId(),
        userId: 'user1',
        type: 'swap',
        status: 'pending',
        batchId,
        initiatingTimestamp: new Date(),
      };

      setBatches(prev => [newBatch, ...prev]);
      setTransactions(prev => [newTransaction, ...prev]);
      setActiveView('history');
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTemplate = (name: string, config: TransferConfig | SwapConfig, type: 'transfer' | 'swap') => {
    const newTemplate: Template = {
      templateId: generateId(),
      userId: 'user1',
      name,
      type,
      config,
      createdAt: new Date(),
    };

    setTemplates(prev => [newTemplate, ...prev]);
  };

  const handleUseTemplate = (template: Template) => {
    if (template.type === 'transfer') {
      setActiveView('transfer');
    } else {
      setActiveView('swap');
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.templateId !== templateId));
  };

  const handleEditTemplate = (template: Template) => {
    // For now, just navigate to the appropriate form
    if (template.type === 'transfer') {
      setActiveView('transfer');
    } else {
      setActiveView('swap');
    }
  };

  const handleRefreshTransactions = () => {
    // Simulate refresh
    console.log('Refreshing transactions...');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'transfer':
        return (
          <BatchTransferForm
            onSubmit={handleBatchTransfer}
            onSaveTemplate={(name, config) => handleSaveTemplate(name, config, 'transfer')}
            isLoading={isLoading}
          />
        );
      
      case 'swap':
        return (
          <SwapForm
            onSubmit={handleSwap}
            onSaveTemplate={(name, config) => handleSaveTemplate(name, config, 'swap')}
            isLoading={isLoading}
          />
        );
      
      case 'history':
        return (
          <TransactionDashboard
            transactions={transactions}
            batches={batches}
            onRefresh={handleRefreshTransactions}
          />
        );
      
      case 'templates':
        return (
          <TemplateManager
            templates={templates}
            onUseTemplate={handleUseTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            onEditTemplate={handleEditTemplate}
          />
        );
      
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
              <CardContent className="p-6 text-center">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Welcome to CoinButler
                </h1>
                <p className="text-text-secondary mb-4">
                  Effortless crypto batching and swapping in one click
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => setActiveView('transfer')}>
                    <Send className="w-4 h-4 mr-2" />
                    Batch Transfer
                  </Button>
                  <Button variant="outline" onClick={() => setActiveView('swap')}>
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Swap
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-text-primary">
                      {transactions.filter(tx => tx.status === 'completed').length}
                    </div>
                    <div className="text-sm text-text-secondary">Completed</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-text-primary">
                      {templates.length}
                    </div>
                    <div className="text-sm text-text-secondary">Templates</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            {transactions.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-text-primary">Recent Activity</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView('history')}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map(transaction => (
                      <div
                        key={transaction.transactionId}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-text-primary capitalize">
                            {transaction.type}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {transaction.initiatingTimestamp.toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          transaction.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {transaction.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'transfer', label: 'Transfer', icon: Send },
            { id: 'swap', label: 'Swap', icon: ArrowRightLeft },
            { id: 'history', label: 'History', icon: History },
            { id: 'templates', label: 'Templates', icon: BookOpen },
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeView === id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveView(id as ActiveView)}
              className="whitespace-nowrap"
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Active View */}
        <div className="animate-fade-in">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}
