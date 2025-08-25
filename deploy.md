# BasketNad Deployment Guide

## Pre-deployment Checklist

### 1. Environment Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Set `WALLET_PRIVATE_KEY` (wallet with GAME_ROLE)
- [ ] Set `API_SECRET` (use: `openssl rand -hex 32`)
- [ ] Set `NEXT_PUBLIC_PRIVY_APP_ID`
- [ ] Verify contract addresses are correct

### 2. Wallet Requirements
- [ ] Wallet has GAME_ROLE on Monad Games ID contract
- [ ] Wallet has sufficient MON tokens for gas fees
- [ ] Wallet can call `updatePlayerData` function

### 3. Testing
- [ ] Run `npm run build` successfully
- [ ] Test locally with `npm run dev`
- [ ] Test score submission functionality
- [ ] Verify transaction appears on Monad explorer

## Deployment Steps

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard

3. **Environment Variables in Vercel**
   ```
   WALLET_PRIVATE_KEY=0x...
   API_SECRET=your_secret_here
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
   NEXT_PUBLIC_RPC_URL=https://testnet-rpc.monad.xyz
   CONTRACT_ADDRESS=0xceCBFF203C8B6044F52CE23D914A1bfD997541A4
   GAME_ADDRESS=0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1
   NEXT_PUBLIC_CHAIN_ID=10143
   NEXT_PUBLIC_CHAIN_NAME=Monad Testnet
   ```

### Netlify Deployment

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   - Same as Vercel above
   - Set in Netlify dashboard under Site settings > Environment variables

## Post-deployment Verification

### 1. Test Game Functionality
- [ ] Login with wallet works
- [ ] Game plays correctly
- [ ] Score submission works
- [ ] Transaction appears on explorer

### 2. Monitor Logs
- [ ] Check Vercel/Netlify function logs
- [ ] Monitor for any API errors
- [ ] Verify blockchain transactions

### 3. Performance Check
- [ ] Game loads quickly
- [ ] No console errors
- [ ] Responsive on mobile devices

## Troubleshooting

### Common Issues

1. **Score Submission Fails**
   - Check wallet has GAME_ROLE
   - Verify sufficient MON tokens
   - Check contract addresses are correct

2. **RPC Connection Issues**
   - Verify RPC URL is correct
   - Check network connectivity
   - Try alternative RPC endpoints

3. **Build Errors**
   - Run `npm install` to update dependencies
   - Check TypeScript errors
   - Verify environment variables

### Debug Commands

```bash
# Check build locally
npm run build

# Test production build
npm run start

# Check environment variables
echo $WALLET_PRIVATE_KEY | head -c 10

# Test RPC connection
curl -X POST https://testnet-rpc.monad.xyz \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

## Security Notes

- Never commit `.env.local` to git
- Use different wallets for development and production
- Monitor wallet balance for gas fees
- Regularly rotate API secrets
- Keep private keys secure

## Support

- Monad Games ID: Contact team for contract roles
- Privy: Check authentication setup
- Vercel/Netlify: Check deployment logs
- GitHub Issues: Report bugs in repository