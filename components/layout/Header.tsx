'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Hexagon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <Hexagon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary">CoinButler</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Wallet>
            <ConnectWallet>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6" />
                <Name className="text-sm font-medium" />
              </div>
            </ConnectWallet>
          </Wallet>
        </div>
      </div>
    </header>
  );
}
