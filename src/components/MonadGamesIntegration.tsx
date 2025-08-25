'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { useMonadGamesId } from '@/hooks/useMonadGamesId';
import MonadSyncGuide from './MonadSyncGuide';
import AddressMismatchGuide from './AddressMismatchGuide';
import { MONAD_GAMES_ID_CONFIG } from '@/config/monad-games-id';

export default function MonadGamesIntegration({
  score,
  gameState,
  onScoreSubmitted
}: {
  score: number;
  gameState: string;
  onScoreSubmitted?: (score: number) => void;
}) {
  const { login, logout } = usePrivy();
  const {
    ready,
    authenticated,
    walletAddress,
    isSubmitting,
    lastSubmittedScore,
    isAddressVerified,
    verificationError,
    submitScore,
    verifyAddressWithMonad
  } = useMonadGamesId();

  const [hasSubmittedThisGame, setHasSubmittedThisGame] = useState(false);

  // Auto-submit score when game ends
  useEffect(() => {
    if (gameState === 'gameOver' && score > 0 && authenticated && !hasSubmittedThisGame && !isSubmitting) {
      submitScore(score).then((success) => {
        if (success) {
          setHasSubmittedThisGame(true);
          onScoreSubmitted?.(score);
        }
      }).catch((error) => {
        console.error('Error submitting score:', error);
      });
    }

    // Reset submission flag when new game starts
    if (gameState === 'playing') {
      setHasSubmittedThisGame(false);
    }
  }, [gameState, score, authenticated, hasSubmittedThisGame, submitScore, isSubmitting, onScoreSubmitted]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Monad Games ID</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">Connected</span>
        </div>
      </div>

      {!authenticated ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-300">
            Connect your wallet to save scores on Monad Games ID
          </p>
          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Player:</span>
            <span className="text-sm text-orange-400 font-mono">
              {walletAddress ?
                `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` :
                'Connected'
              }
            </span>
          </div>

          {/* Address Verification Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Monad ID:</span>
            <div className="flex items-center space-x-2">
              {isAddressVerified ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-400">Verified</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-yellow-400">Checking...</span>
                </>
              )}
            </div>
          </div>

          {/* Show verification error if any */}
          {verificationError && !isAddressVerified && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-semibold text-red-400">Address Tidak Sinkron</span>
              </div>
              <p className="text-xs text-red-300 mb-2">
                Wallet address Anda berbeda dengan yang terdaftar di Monad Games ID
              </p>
              <div className="text-xs text-gray-300 space-y-1 mb-2">
                <div>Game: {walletAddress?.slice(0, 10)}...{walletAddress?.slice(-6)}</div>
                <div>Monad ID: {MONAD_GAMES_ID_CONFIG.TEST_ADDRESSES.MONAD_GAMES_ID_USER.slice(0, 10)}...{MONAD_GAMES_ID_CONFIG.TEST_ADDRESSES.MONAD_GAMES_ID_USER.slice(-6)}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={verifyAddressWithMonad}
                  className="text-xs text-red-300 hover:text-red-200 underline"
                >
                  Coba Lagi
                </button>
              </div>
              <AddressMismatchGuide 
                gameAddress={walletAddress || ''} 
                monadAddress={MONAD_GAMES_ID_CONFIG.TEST_ADDRESSES.MONAD_GAMES_ID_USER} 
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Current Score:</span>
            <span className="text-lg font-bold text-white">{score}</span>
          </div>

          {lastSubmittedScore && lastSubmittedScore > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Best Score:</span>
              <span className="text-sm text-green-400 font-bold">{lastSubmittedScore}</span>
            </div>
          )}

          {isSubmitting && (
            <div className="flex items-center justify-center space-x-2 text-orange-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400"></div>
              <span className="text-sm">Submitting to Monad Games ID...</span>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
          >
            Disconnect
          </button>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-600 space-y-2">
        <a
          href="https://monad-games-id-site.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs text-orange-400 hover:text-orange-300 transition-colors text-center"
        >
          View on Monad Games ID →
        </a>
        
        <div className="text-center">
          <MonadSyncGuide />
        </div>
      </div>
    </div>
  );
}