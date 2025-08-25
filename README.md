# BasketNad 🏀

Professional Basketball Game on Monad Blockchain with full Monad Games ID integration.

## Features

- 🏀 **Realistic Basketball Physics** - Drag and shoot with authentic ball physics
- ⛓️ **Monad Blockchain Integration** - Scores saved on Monad Games ID
- 🎯 **Time Challenge Mode** - 60-second scoring challenges
- 📱 **Mobile Responsive** - Play on desktop and mobile devices
- 🔐 **Wallet Authentication** - Secure login with Privy
- 🏆 **Score Tracking** - Automatic score submission to blockchain

## Quick Start

### 1. Installation

```bash
git clone <your-repo-url>
cd basketballnad
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
WALLET_PRIVATE_KEY=0x...  # Wallet with GAME_ROLE
API_SECRET=your_secret_here
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
```

### 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play!

### 4. Production Build

```bash
npm run build
npm run start
```

## Monad Integration

### Network Details
- **RPC**: https://testnet-rpc.monad.xyz
- **Chain ID**: 10143
- **Explorer**: https://testnet.monadexplorer.com

### Contract Addresses
- **Monad Games ID**: `0xceCBFF203C8B6044F52CE23D914A1bfD997541A4`
- **BasketNad Game**: `0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1`

## How to Play

1. **Connect Wallet** - Login with your Monad-compatible wallet
2. **Start Game** - Click "START GAME" to begin 60-second challenge
3. **Aim & Shoot** - Drag the basketball to aim, release to shoot
4. **Score Points** - Each successful basket earns 1 point
5. **Submit Score** - Scores automatically submit to Monad Games ID

## Game Controls

- **Desktop**: Click and drag with mouse
- **Mobile**: Touch and drag with finger
- **Aiming**: Drag ball to set power and direction
- **Shooting**: Release to shoot the ball

## Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Blockchain**: Ethers.js, Privy Auth
- **Network**: Monad Testnet

## Project Structure

```
src/
├── app/
│   ├── api/                 # API routes for blockchain interaction
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # App layout
│   └── page.tsx             # Main game page
├── components/              # React components
│   ├── Basketball.tsx       # Ball component
│   ├── BasketballCourt.tsx  # Game court
│   ├── BasketballHoop.tsx   # Hoop component
│   ├── GameHUD.tsx          # Score/timer display
│   ├── LoginScreen.tsx      # Authentication
│   └── MonadGamesIntegration.tsx  # Blockchain integration
├── hooks/                   # Custom React hooks
│   ├── useGameLogic.ts      # Game state management
│   ├── useMonadGamesId.ts   # Blockchain integration
│   └── useMouseHandlers.ts  # Input handling
└── providers/               # Context providers
    └── PrivyProvider.tsx    # Authentication provider
```

## Deployment

See [deploy.md](./deploy.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/basketballnad)

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Monad-compatible wallet
- MON tokens for gas fees

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WALLET_PRIVATE_KEY` | Wallet with GAME_ROLE on contract | Yes |
| `API_SECRET` | Secret for session tokens | Yes |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy authentication app ID | Yes |
| `CONTRACT_ADDRESS` | Monad Games ID contract address | No* |
| `GAME_ADDRESS` | Your registered game address | No* |

*Default values provided for Monad testnet

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- � **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Open an issue with enhancement label
- 📧 **Contact**: [your-email@example.com]
- 🌐 **Website**: [https://basketnad.vercel.app]

## Acknowledgments

- Monad Games ID team for blockchain integration
- Privy for authentication infrastructure
- Next.js team for the amazing framework
- Basketball physics inspired by real-world mechanics

---

Made with ❤️ for the Monad ecosystem