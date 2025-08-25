'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { createConfig } from '@privy-io/wagmi';
import { MONAD_GAMES_ID_CONFIG } from '@/config/monad-games-id';

// Monad Testnet configuration from centralized config
const monadTestnet = {
  id: MONAD_GAMES_ID_CONFIG.NETWORK.chainId,
  name: MONAD_GAMES_ID_CONFIG.NETWORK.name,
  nativeCurrency: {
    decimals: MONAD_GAMES_ID_CONFIG.NETWORK.currency.decimals,
    name: MONAD_GAMES_ID_CONFIG.NETWORK.currency.name,
    symbol: MONAD_GAMES_ID_CONFIG.NETWORK.currency.symbol,
  },
  rpcUrls: {
    default: { http: [MONAD_GAMES_ID_CONFIG.NETWORK.rpcUrl] },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: MONAD_GAMES_ID_CONFIG.NETWORK.explorerUrl },
  },
  testnet: true,
} as const;

const config = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  // Use Monad Games ID App ID from config, fallback to env variable
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || MONAD_GAMES_ID_CONFIG.PRIVY_APP_ID;
  
  // If no Privy App ID is provided, render children without Privy
  if (!privyAppId) {
    console.warn('NEXT_PUBLIC_PRIVY_APP_ID is not set. Privy authentication will be disabled.');
    return (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    );
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#ff6b00',
          logo: '/icon.png',
          showWalletLoginFirst: false,
          walletChainType: 'ethereum-only',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
        },
        defaultChain: monadTestnet,
        supportedChains: [monadTestnet],
        loginMethods: ['email', 'wallet'],
        // Monad Games ID specific configuration
        mfa: {
          noPromptOnMfaRequired: false,
        },
        // This ensures the login shows "Monad Games ID" branding
        legal: {
          termsAndConditionsUrl: `${MONAD_GAMES_ID_CONFIG.SITE_URL}/terms`,
          privacyPolicyUrl: `${MONAD_GAMES_ID_CONFIG.SITE_URL}/privacy`,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}