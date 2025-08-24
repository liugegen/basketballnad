'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useMonadGamesId } from '@/hooks/useMonadGamesId';

export default function MonadConnectionStatus() {
  const { ready, authenticated, login } = usePrivy();
  const { walletAddress } = useMonadGamesId();

  if (!ready) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-500"></div>
        <span className="text-xs">Connecting...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${authenticated ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-xs text-white">
        {authenticated ? 'Connected to Monad' : 'Not Connected'}
      </span>
      {!authenticated && (
        <button
          onClick={login}
          className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded transition-colors"
        >
          Connect
        </button>
      )}
      {authenticated && walletAddress && (
        <span className="text-xs text-orange-400 font-mono">
          {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
        </span>
      )}
    </div>
  );
}