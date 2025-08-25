# Monad Games ID Integration

BasketNad is now fully integrated with Monad Games ID following the successful pattern from the [mission7-example-game](https://github.com/portdeveloper/mission7-example-game).

## Features

✅ **Removed Leaderboard** - Cleaned up UI by removing the leaderboard component from the main menu
✅ **Full Monad Games ID Integration** - Proper score submission to blockchain
✅ **Session-based Authentication** - Secure score submission with session tokens
✅ **Automatic Score Submission** - Scores are automatically submitted when game ends
✅ **Transaction Tracking** - View transactions on Monad testnet explorer
✅ **Error Handling** - Proper handling of blockchain errors and retries

## Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# Required: Wallet private key with GAME_ROLE on the contract
WALLET_PRIVATE_KEY=0x...

# Required: API secret for session tokens
API_SECRET=your_secret_here

# Required: Privy App ID
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Optional: Custom RPC URL
NEXT_PUBLIC_RPC_URL=https://testnet1.monad.xyz

# Contract address (provided by Monad Games ID team)
CONTRACT_ADDRESS=0x...
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Deploy and Configure

1. Deploy your game to Vercel/Netlify
2. Contact Monad Games ID team to get your contract address
3. Ensure your wallet has the GAME_ROLE on the contract
4. Fund your wallet with MON tokens for gas fees

## How It Works

### Score Submission Flow

1. **Game Ends** → Score > 0 triggers automatic submission
2. **Session Token** → Generated for secure authentication
3. **Blockchain Transaction** → Score submitted to Monad Games ID contract
4. **Confirmation** → Transaction hash logged and displayed

### API Endpoints

- `POST /api/get-session-token` - Generate session token for authentication
- `POST /api/update-player-data` - Submit score to blockchain contract
- `GET /api/get-player-data` - Retrieve player's total score and transactions

### Contract Integration

The game interacts with the Monad Games ID smart contract:

```solidity
function updatePlayerData(
    address player,
    address gameAddress,
    uint256 scoreAmount,
    uint256 transactionAmount
) external;

function getPlayerDataPerGame(address player, address gameAddress) 
    external view returns (uint256 score, uint256 transactions);
```

## Key Improvements

### 1. Removed Leaderboard
- Cleaned up the main game interface
- Removed `MonadLeaderboard.tsx` component
- Simplified `MonadGamesIntegration.tsx`

### 2. Proper Blockchain Integration
- Following the successful pattern from mission7-example-game
- Session-based authentication for security
- Proper error handling for blockchain transactions
- Transaction batching to avoid nonce conflicts

### 3. Better User Experience
- Automatic score submission on game end
- Clear status indicators
- Link to view scores on Monad Games ID website
- Transaction confirmation with explorer links

## Testing

1. **Local Development**: Test with dummy session tokens
2. **Testnet**: Deploy to testnet and test with real MON tokens
3. **Production**: Deploy to mainnet with proper contract address

## Support

For issues with Monad Games ID integration:
1. Check the [example repo](https://github.com/portdeveloper/mission7-example-game)
2. Contact Monad Games ID team for contract addresses and roles
3. Ensure your wallet has sufficient MON tokens for gas fees

## Monad Testnet Information

**Network Details:**
- RPC URL: https://testnet-rpc.monad.xyz
- Chain ID: 10143
- Explorer: https://testnet.monadexplorer.com/

**Contract Addresses:**
- Monad Games ID Contract: `0xceCBFF203C8B6044F52CE23D914A1bfD997541A4`
- BasketNad Game Address: `0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1`

## Transaction Explorer

View your transactions on Monad Testnet:
- Explorer: https://testnet.monadexplorer.com/
- Example: https://testnet.monadexplorer.com/tx/YOUR_TX_HASH