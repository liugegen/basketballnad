'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function MonadGamesStatus() {
  const { ready, authenticated, user, login } = usePrivy();

  if (!ready) {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-orange-500/20 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">Monad Games ID</span>
        </div>
        
        {authenticated ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-400">Connected</span>
          </div>
        ) : (
          <button
            onClick={login}
            className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md transition-colors"
          >
            Connect
          </button>
        )}
      </div>
      
      {authenticated && user?.wallet?.address && (
        <div className="mt-2 text-xs text-gray-400 font-mono">
          {user.wallet.address.slice(0, 6)}...{user.wallet.address.slice(-4)}
        </div>
      )}
    </div>
  );
}