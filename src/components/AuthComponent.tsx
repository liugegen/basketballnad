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
          className="relative overflow-hidden group transition-all duration-300 transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6366f1 100%)',
            padding: '16px 32px',
            borderRadius: '16px',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Enhanced glow effect */}
          <div 
            className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)'
            }}
          ></div>
          
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
            style={{ borderRadius: '16px' }}
          ></div>
          
          <div className="relative flex items-center gap-4 text-white">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="text-xl">🎮</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="hidden sm:inline text-lg font-bold tracking-wide">
                Login with Monad Games ID
              </span>
              <span className="sm:hidden text-lg font-bold">Login</span>
              <span className="hidden sm:inline text-sm opacity-80 font-medium">
                Connect your wallet to start playing
              </span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
      {accountAddress ? (
        <>
          {/* Professional User Profile Card */}
          <div 
            className="flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(147, 51, 234, 0.25)',
              boxShadow: '0 8px 25px rgba(147, 51, 234, 0.15)'
            }}
          >
            {/* Enhanced Avatar */}
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)',
                boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)'
              }}
            >
              <div 
                className="absolute inset-0 rounded-full blur-sm opacity-40 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)'
                }}
              ></div>
              <span className="text-white font-bold text-xl relative z-10">
                {hasUsername && monadUser ? monadUser.username.charAt(0).toUpperCase() : '👤'}
              </span>
            </div>

            {/* Enhanced User Info */}
            <div className="flex flex-col">
              {hasUsername && monadUser ? (
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-lg">
                    {monadUser.username}
                  </span>
                  <span 
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                      color: '#22c55e',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    ✓ Verified
                  </span>
                </div>
              ) : (
                <a
                  href="https://monad-games-id-site.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-white text-sm font-semibold underline flex items-center gap-2 transition-colors duration-200"
                >
                  <span>Register Username</span>
                  <span className="text-xs">↗</span>
                </a>
              )}
              <span 
                className="text-xs font-mono mt-1"
                style={{ color: 'rgba(203, 213, 225, 0.7)' }}
              >
                {formatAddress(accountAddress)}
              </span>
            </div>
          </div>



          {/* Professional Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              style={{
                background: 'rgba(147, 51, 234, 0.15)',
                color: '#c4b5fd',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                boxShadow: '0 2px 8px rgba(147, 51, 234, 0.1)'
              }}
              title={accountAddress}
            >
              <span className="text-base">{copied ? '✓' : '📋'}</span>
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)'
              }}
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