'use client';

import { cn } from '@/lib/utils';
import { TransactionStatus } from '@/lib/types';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: TransactionStatus;
  variant?: 'default' | 'compact';
  className?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'status-pending',
  },
  processing: {
    icon: Clock,
    label: 'Processing',
    className: 'status-processing',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    className: 'status-completed',
  },
  failed: {
    icon: XCircle,
    label: 'Failed',
    className: 'status-failed',
  },
};

export function StatusIndicator({ 
  status, 
  variant = 'default', 
  className 
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  if (variant === 'compact') {
    return (
      <div className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}>
        <Icon className="w-3 h-3" />
        {config.label}
      </div>
    );
  }

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border',
      config.className,
      className
    )}>
      <Icon className="w-4 h-4" />
      {config.label}
    </div>
  );
}
