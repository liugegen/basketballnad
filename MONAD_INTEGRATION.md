# Monad Games ID Integration

BasketNad is now fully integrated with Monad Games ID following the successful pattern from the [mission7-example-game](https://github.com/portdeveloper/mission7-example-game).

## Features

✅ **Address Synchronization** - Ensures wallet address matches Monad Games ID account
✅ **Full Monad Games ID Integration** - Proper score submission to blockchain
✅ **Session-based Authentication** - Secure score submission with wallet signatures
✅ **Automatic Score Submission** - Scores are automatically submitted when game ends
✅ **Address Verification** - Validates that user's wallet matches their Monad Games ID
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

### Address Synchronization Flow

1. **User Login** → User connects wallet with email
2. **Address Verification** → System verifies wallet address matches Monad Games ID account
3. **Verification Status** → Shows if address is synchronized or needs attention

### Score Submission Flow

1. **Address Check** → Ensures address is verified with Monad Games ID
2. **Game Ends** → Score > 0 triggers automatic submission
3. **Wallet Signature** → User signs message for authentication
4. **Session Token** → Generated with verified signature
5. **Blockchain Transaction** → Score submitted to Monad Games ID contract
6. **Confirmation** → Transaction hash logged and displayed

### API Endpoints

- `POST /api/verify-monad-address` - Verify wallet address with Monad Games ID
- `POST /api/get-session-token` - Generate session token with wallet signature
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

## Troubleshooting Address Synchronization

### Problem: Address Berbeda dengan Monad Games ID

**Gejala:**
- Score tidak tersimpan setelah game selesai
- Status "Address not verified" di UI
- Error "Address not verified with Monad Games ID"

**Penyebab:**
- Wallet address yang digunakan di game berbeda dengan yang terdaftar di Monad Games ID
- User menggunakan email yang sama tapi wallet yang berbeda

**Solusi:**

1. **Periksa Address di Monad Games ID:**
   - Buka https://monad-games-id-site.vercel.app
   - Login dengan email yang sama
   - Catat address wallet yang terdaftar

2. **Gunakan Wallet yang Sama:**
   - Import wallet dengan private key yang sama
   - Atau connect wallet yang sudah terdaftar di Monad Games ID

3. **Daftarkan Wallet Baru:**
   - Jika ingin menggunakan wallet baru
   - Daftarkan wallet tersebut di Monad Games ID terlebih dahulu

4. **Verifikasi Konfigurasi:**
   - Pastikan `NEXT_PUBLIC_PRIVY_APP_ID` sudah diset
   - Pastikan menggunakan email yang sama di kedua platform

### Problem: Session Token Error

**Gejala:**
- Error "Invalid signature" saat submit score
- Gagal generate session token

**Solusi:**
- Pastikan wallet sudah connect ke Monad Testnet (Chain ID: 10143)
- Coba disconnect dan connect ulang wallet
- Refresh browser dan coba lagi

## Support

For issues with Monad Games ID integration:
1. Check the [example repo](https://github.com/portdeveloper/mission7-example-game)
2. Contact Monad Games ID team for contract addresses and roles
3. Ensure your wallet has sufficient MON tokens for gas fees
4. Verify address synchronization between game and Monad Games ID

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