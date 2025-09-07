'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowUpDown, Save } from 'lucide-react';
import { validateAmount, generateId } from '@/lib/utils';
import { SUPPORTED_TOKENS, SUPPORTED_CHAINS, DEFAULT_SLIPPAGE } from '@/lib/constants';
import { SwapConfig } from '@/lib/types';

interface SwapFormProps {
  onSubmit: (config: SwapConfig) => void;
  onSaveTemplate: (name: string, config: SwapConfig) => void;
  isLoading?: boolean;
}

export function SwapForm({ 
  onSubmit, 
  onSaveTemplate, 
  isLoading = false 
}: SwapFormProps) {
  const [fromToken, setFromToken] = useState(SUPPORTED_TOKENS[0].symbol);
  const [toToken, setToToken] = useState(SUPPORTED_TOKENS[1].symbol);
  const [fromChain, setFromChain] = useState(SUPPORTED_CHAINS[0].name);
  const [toChain, setToChain] = useState(SUPPORTED_CHAINS[0].name);
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [templateName, setTemplateName] = useState('');
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromChain(toChain);
    setToChain(fromChain);
  };

  const validateForm = (): boolean => {
    return validateAmount(amount) && fromToken !== toToken;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const config: SwapConfig = {
      fromToken,
      toToken,
      fromChain,
      toChain,
      amount,
      slippageTolerance: slippage,
    };

    onSubmit(config);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !validateForm()) return;

    const config: SwapConfig = {
      fromToken,
      toToken,
      fromChain,
      toChain,
      amount,
      slippageTolerance: slippage,
    };

    onSaveTemplate(templateName, config);
    setShowSaveTemplate(false);
    setTemplateName('');
  };

  // Mock exchange rate calculation
  const exchangeRate = 1.05; // This would come from a real API
  const estimatedOutput = validateAmount(amount) ? (parseFloat(amount) * exchangeRate).toFixed(6) : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inter-Chain Swap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From Section */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-text-primary">From</label>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="h-10 rounded-lg border border-border bg-surface px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SUPPORTED_TOKENS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            
            <select
              value={fromChain}
              onChange={(e) => setFromChain(e.target.value)}
              className="h-10 rounded-lg border border-border bg-surface px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SUPPORTED_CHAINS.map(chain => (
                <option key={chain.name} value={chain.name}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
          
          <Input
            type="number"
            step="0.000001"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={amount && !validateAmount(amount) ? 'Invalid amount' : undefined}
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={swapTokens}
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Section */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-text-primary">To</label>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="h-10 rounded-lg border border-border bg-surface px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SUPPORTED_TOKENS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            
            <select
              value={toChain}
              onChange={(e) => setToChain(e.target.value)}
              className="h-10 rounded-lg border border-border bg-surface px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SUPPORTED_CHAINS.map(chain => (
                <option key={chain.name} value={chain.name}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="h-10 rounded-lg border border-border bg-surface/50 px-3 flex items-center text-text-secondary">
            ≈ {estimatedOutput} {toToken}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-text-primary">
            Slippage Tolerance
          </label>
          <div className="flex gap-2">
            {[0.1, 0.5, 1.0].map(value => (
              <Button
                key={value}
                variant={slippage === value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSlippage(value)}
              >
                {value}%
              </Button>
            ))}
            <Input
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value) || DEFAULT_SLIPPAGE)}
              className="w-20"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-surface/50 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Exchange Rate:</span>
            <span className="text-text-primary">1 {fromToken} = {exchangeRate} {toToken}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Network Fee:</span>
            <span className="text-text-primary">~$2.50</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Minimum Received:</span>
            <span className="text-text-primary">
              {validateAmount(amount) ? (parseFloat(amount) * exchangeRate * (1 - slippage / 100)).toFixed(6) : '0'} {toToken}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={!validateForm() || isLoading}
            className="flex-1"
          >
            {isLoading ? 'Processing...' : 'Execute Swap'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowSaveTemplate(true)}
            disabled={!validateForm()}
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>

        {/* Save Template Modal */}
        {showSaveTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Save Template
              </h3>
              <Input
                label="Template Name"
                placeholder="e.g., ETH to USDC Swap"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleSaveTemplate}
                  disabled={!templateName.trim()}
                  className="flex-1"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSaveTemplate(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
