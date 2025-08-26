"use client";
import { useEffect, useState } from "react";
import {
  usePrivy,
  CrossAppAccountWithMetadata,
} from "@privy-io/react-auth";
import { useMonadGamesUser } from "@/hooks/useMonadGamesUser";
import { useMonadGamesScore } from "@/hooks/useMonadGamesScore";

// Separate component for when Privy is not configured
function AuthNotConfigured() {
  return (
    <div className="text-yellow-400 text-sm">
      Authentication not configured
    </div>
  );
}

// Main auth component with Privy hooks
function PrivyAuth({ onAddressChange }: { onAddressChange: (address: string) => void }) {
  const { authenticated, user, ready, logout, login } = usePrivy();
  const [accountAddress, setAccountAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const {
    user: monadUser,
    hasUsername
  } = useMonadGamesUser(accountAddress);

  const {
    totalScore,
    gamesPlayed,
    isLoading: scoreLoading,
    refreshScore
  } = useMonadGamesScore(accountAddress);

  useEffect(() => {
    // Check if privy is ready and user is authenticated
    if (authenticated && user && ready) {
      // Check if user has linkedAccounts
      if (user.linkedAccounts.length > 0) {
        // Get the cross app account created using Monad Games ID        
        const crossAppAccount: CrossAppAccountWithMetadata = user.linkedAccounts.filter(account => account.type === "cross_app" && account.providerApp.id === "cmd8euall0037le0my79qpz42")[0] as CrossAppAccountWithMetadata;

        // The first embedded wallet created using Monad Games ID, is the wallet address
        if (crossAppAccount && crossAppAccount.embeddedWallets.length > 0) {
          const address = crossAppAccount.embeddedWallets[0].address;
          setAccountAddress(address);
          onAddressChange(address);
        }
      } else {
        setMessage("You need to link your Monad Games ID account to continue.");
      }
    } else {
      // Clear address when not authenticated
      setAccountAddress("");
      onAddressChange("");
    }
  }, [authenticated, user, ready, onAddressChange]);

  const copyToClipboard = async () => {
    if (accountAddress) {
      try {
        await navigator.clipboard.writeText(accountAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!ready) {
    return <div className="text-white text-sm">Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="flex justify-center">
        <button
          onClick={login}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
        >
          <span className="text-xl">🎮</span>
          <span className="hidden sm:inline">Login with Monad Games ID</span>
          <span className="sm:hidden">Login</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
      {accountAddress ? (
        <>
          {/* User Profile Card */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {hasUsername && monadUser ? monadUser.username.charAt(0).toUpperCase() : '👤'}
              </span>
            </div>
            
            {/* User Info */}
            <div className="flex flex-col">
              {hasUsername && monadUser ? (
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-base">
                    {monadUser.username}
                  </span>
                  <span className="text-green-400 text-xs bg-green-400/20 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              ) : (
                <a
                  href="https://monad-games-id-site.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium underline flex items-center gap-1"
                >
                  <span>Register Username</span>
                  <span className="text-xs">↗</span>
                </a>
              )}
              <span className="text-gray-400 text-xs font-mono">
                {formatAddress(accountAddress)}
              </span>
            </div>
          </div>

          {/* Total Score Display */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-3 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {scoreLoading ? (
                    <div className="animate-spin w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full mx-auto"></div>
                  ) : (
                    totalScore.toLocaleString()
                  )}
                </div>
                <div className="text-xs text-purple-300">Total Score</div>
              </div>
              
              <div className="w-px h-8 bg-white/20"></div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-white">
                  {scoreLoading ? '...' : gamesPlayed}
                </div>
                <div className="text-xs text-blue-300">Games</div>
              </div>
              
              <div className="w-px h-8 bg-white/20"></div>
              
              {/* Refresh Button */}
              <button
                onClick={refreshScore}
                disabled={scoreLoading}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-2 rounded-lg transition-colors border border-green-500/30 disabled:opacity-50"
                title="Refresh Score"
              >
                <span className={`text-sm ${scoreLoading ? 'animate-spin' : ''}`}>
                  🔄
                </span>
              </button>
            </div>
            
            {/* Sync Status */}
            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">
                  Synced with Monad Games ID
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg text-xs transition-colors border border-blue-500/30 flex items-center gap-1"
              title={accountAddress}
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            
            <button
              onClick={logout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg text-xs transition-colors border border-red-500/30"
            >
              Logout
            </button>
          </div>
        </>
      ) : message ? (
        <div className="text-center">
          <span className="text-red-400 text-sm">{message}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
          <span className="text-yellow-400 text-sm">Checking...</span>
        </div>
      )}
    </div>
  );
}

// Main component that conditionally renders based on Privy configuration
export default function AuthComponent({ onAddressChange }: { onAddressChange: (address: string) => void }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!privyAppId) {
    return <AuthNotConfigured />;
  }

  return <PrivyAuth onAddressChange={onAddressChange} />;
}