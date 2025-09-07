'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Play, Edit2, Trash2, Search } from 'lucide-react';
import { Template, TransferConfig, SwapConfig } from '@/lib/types';
import { formatTimestamp } from '@/lib/utils';

interface TemplateManagerProps {
  templates: Template[];
  onUseTemplate: (template: Template) => void;
  onDeleteTemplate: (templateId: string) => void;
  onEditTemplate: (template: Template) => void;
}

export function TemplateManager({ 
  templates, 
  onUseTemplate, 
  onDeleteTemplate, 
  onEditTemplate 
}: TemplateManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'transfer' | 'swap'>('all');

  const filteredTemplates = templates.filter(template => {
    if (filter !== 'all' && template.type !== filter) return false;
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const renderTemplateConfig = (template: Template) => {
    if (template.type === 'transfer') {
      const config = template.config as TransferConfig;
      return (
        <div className="text-sm text-text-secondary">
          <div>Token: {config.token}</div>
          <div>Recipients: {config.recipients.length}</div>
          <div>
            Total: {config.recipients.reduce((sum, r) => sum + parseFloat(r.amount), 0).toFixed(4)} {config.token}
          </div>
        </div>
      );
    } else {
      const config = template.config as SwapConfig;
      return (
        <div className="text-sm text-text-secondary">
          <div>{config.fromToken} → {config.toToken}</div>
          <div>{config.fromChain} → {config.toChain}</div>
          <div>Amount: {config.amount}</div>
        </div>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Templates</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'transfer' | 'swap')}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="transfer">Transfers</option>
            <option value="swap">Swaps</option>
          </select>
        </div>

        {/* Template List */}
        <div className="space-y-3">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              {templates.length === 0 ? 'No templates saved yet' : 'No templates match your search'}
            </div>
          ) : (
            filteredTemplates.map(template => (
              <div
                key={template.templateId}
                className="p-4 border border-border rounded-lg hover:bg-surface/50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-text-primary">{template.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.type === 'transfer' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {template.type}
                      </span>
                    </div>
                    <div className="text-sm text-text-secondary">
                      Created {formatTimestamp(template.createdAt)}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUseTemplate(template)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditTemplate(template)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTemplate(template.templateId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {renderTemplateConfig(template)}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
