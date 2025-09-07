'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Trash2, Save } from 'lucide-react';
import { validateAddress, validateAmount, generateId } from '@/lib/utils';
import { SUPPORTED_TOKENS } from '@/lib/constants';
import { TransferConfig } from '@/lib/types';

interface Recipient {
  id: string;
  address: string;
  amount: string;
  label?: string;
}

interface BatchTransferFormProps {
  onSubmit: (config: TransferConfig) => void;
  onSaveTemplate: (name: string, config: TransferConfig) => void;
  isLoading?: boolean;
}

export function BatchTransferForm({ 
  onSubmit, 
  onSaveTemplate, 
  isLoading = false 
}: BatchTransferFormProps) {
  const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS[0].symbol);
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: generateId(), address: '', amount: '', label: '' }
  ]);
  const [templateName, setTemplateName] = useState('');
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);

  const addRecipient = () => {
    setRecipients([...recipients, { 
      id: generateId(), 
      address: '', 
      amount: '', 
      label: '' 
    }]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter(r => r.id !== id));
    }
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const validateForm = (): boolean => {
    return recipients.every(r => 
      validateAddress(r.address) && validateAmount(r.amount)
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const config: TransferConfig = {
      token: selectedToken,
      recipients: recipients.map(r => ({
        address: r.address,
        amount: r.amount,
        label: r.label,
      })),
    };

    onSubmit(config);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !validateForm()) return;

    const config: TransferConfig = {
      token: selectedToken,
      recipients: recipients.map(r => ({
        address: r.address,
        amount: r.amount,
        label: r.label,
      })),
    };

    onSaveTemplate(templateName, config);
    setShowSaveTemplate(false);
    setTemplateName('');
  };

  const totalAmount = recipients.reduce((sum, r) => {
    const amount = parseFloat(r.amount) || 0;
    return sum + amount;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Transfer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Selection */}
        <div>
          <label className="text-sm font-medium text-text-primary mb-2 block">
            Token
          </label>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {SUPPORTED_TOKENS.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name}
              </option>
            ))}
          </select>
        </div>

        {/* Recipients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text-primary">
              Recipients ({recipients.length})
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={addRecipient}
              disabled={recipients.length >= 50}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {recipients.map((recipient, index) => (
            <div key={recipient.id} className="space-y-3 p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-secondary">
                  Recipient {index + 1}
                </span>
                {recipients.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecipient(recipient.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Input
                  label="Address"
                  placeholder="0x..."
                  value={recipient.address}
                  onChange={(e) => updateRecipient(recipient.id, 'address', e.target.value)}
                  error={recipient.address && !validateAddress(recipient.address) ? 'Invalid address' : undefined}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Amount"
                    type="number"
                    step="0.000001"
                    placeholder="0.0"
                    value={recipient.amount}
                    onChange={(e) => updateRecipient(recipient.id, 'amount', e.target.value)}
                    error={recipient.amount && !validateAmount(recipient.amount) ? 'Invalid amount' : undefined}
                  />
                  
                  <Input
                    label="Label (optional)"
                    placeholder="e.g., Alice"
                    value={recipient.label}
                    onChange={(e) => updateRecipient(recipient.id, 'label', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-4 bg-surface/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Total Amount:</span>
            <span className="text-lg font-bold text-text-primary">
              {totalAmount.toFixed(6)} {selectedToken}
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
            {isLoading ? 'Processing...' : 'Execute Batch Transfer'}
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
                placeholder="e.g., Weekly Payroll"
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
