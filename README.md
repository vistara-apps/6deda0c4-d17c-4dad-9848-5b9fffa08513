# CoinButler - Base Mini App

CoinButler is a comprehensive Base Mini App that enables users to perform multiple crypto transfers and swaps in a single, intuitive click. Built for busy crypto users who value efficiency.

## Features

### 🚀 Core Features
- **Batch Crypto Transfers**: Send crypto to multiple recipients simultaneously
- **Inter-Chain Swaps**: Exchange cryptocurrencies between different blockchain networks
- **Unified Transaction Dashboard**: Monitor all transfers and swaps in real-time
- **Pre-defined Templates**: Save and reuse common transaction patterns

### 🎯 Key Benefits
- **Time Saving**: Execute multiple transactions in one batch
- **Error Reduction**: Minimize mistakes with template-based operations
- **Cost Efficient**: Optimize gas fees through batching
- **User Friendly**: Intuitive interface designed for mobile-first experience

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Coinbase L2)
- **Wallet Integration**: OnchainKit + MiniKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Base wallet (Coinbase Wallet recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coinbutler-base-miniapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your OnchainKit API key:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit provider setup
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── constants.ts      # App constants
└── public/               # Static assets
```

## Key Components

### BatchTransferForm
Handles multiple recipient transfers with validation and template saving.

### SwapForm  
Manages inter-chain swaps with slippage tolerance and rate estimation.

### TransactionDashboard
Real-time monitoring of all transactions with filtering and status updates.

### TemplateManager
Save, edit, and reuse common transaction patterns.

## Design System

The app uses a custom design system with:
- **Colors**: Dark theme with purple/blue gradients
- **Typography**: Inter font with semantic sizing
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable UI components with variants

## API Integration

The app integrates with:
- **Alchemy SDK**: Blockchain interactions
- **WalletConnect**: Secure wallet connections  
- **Base RPC**: Direct Base network access
- **Airstack**: Enhanced transaction data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for the Base ecosystem
