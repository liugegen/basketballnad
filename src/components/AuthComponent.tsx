"use client";
import { useEffect, useState } from "react";
import {
  usePrivy,
  CrossAppAccountWithMetadata,
} from "@privy-io/react-auth";
import { useMonadGamesUser } from "@/hooks/useMonadGamesUser";

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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      {accountAddress ? (
        <>
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">
                {hasUsername && monadUser ? monadUser.username.charAt(0).toUpperCase() : '👤'}
              </span>
            </div>
            
            <div className="flex flex-col">
              {hasUsername && monadUser ? (
                <span className="text-white font-semibold text-sm">
                  {monadUser.username}
                </span>
              ) : (
                <a
                  href="https://monad-games-id-site.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium underline"
                >
                  Register Username
                </a>
              )}
              <span className="text-gray-400 text-xs font-mono">
                {formatAddress(accountAddress)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg text-xs transition-colors border border-blue-500/30"
              title={accountAddress}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
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