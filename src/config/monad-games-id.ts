// Monad Games ID Configuration
export const MONAD_GAMES_ID_CONFIG = {
  // Privy App ID from Monad Games ID
  PRIVY_APP_ID: 'cmd8euall0037le0my79qpz42',
  
  // Monad Games ID URLs
  SITE_URL: 'https://monad-games-id-site.vercel.app',
  API_BASE_URL: 'https://monad-games-id-api.vercel.app', // Replace with actual API URL
  
  // Contract addresses
  CONTRACT_ADDRESS: '0xceCBFF203C8B6044F52CE23D914A1bfD997541A4',
  GAME_ADDRESS: '0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1',
  
  // Network configuration
  NETWORK: {
    chainId: 10143,
    name: 'Monad Testnet',
    rpcUrl: 'https://testnet-rpc.monad.xyz',
    explorerUrl: 'https://testnet.monadexplorer.com',
    currency: {
      name: 'MON',
      symbol: 'MON',
      decimals: 18,
    },
  },
  
  // Known addresses for testing
  TEST_ADDRESSES: {
    MONAD_GAMES_ID_USER: '0x5aac3d6Cbb8121DF38e3581Ce3999F106DB599c1',
    GAME_USER: '0x3D1cC858Baf50058223CdE15d39CBa648949C9Eb',
  },
} as const;

// Helper functions
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function isAddressMatch(address1: string, address2: string): boolean {
  if (!address1 || !address2) return false;
  return address1.toLowerCase() === address2.toLowerCase();
}

export function getExplorerUrl(txHash: string): string {
  return `${MONAD_GAMES_ID_CONFIG.NETWORK.explorerUrl}/tx/${txHash}`;
}

export function getMonadGamesIdUrl(path: string = ''): string {
  return `${MONAD_GAMES_ID_CONFIG.SITE_URL}${path}`;
}