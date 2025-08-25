'use client';

import { useEffect, useState } from 'react';
import { useMonadGamesUser } from '@/hooks/useMonadGamesUser';

export default function MonadGamesIntegration({
  score,
  gameState,
  playerAddress,
  onScoreSubmitted
}: {
  score: number;
  gameState: string;
  playerAddress: string;
  onScoreSubmitted?: (score: number) => void;
}) {
  const [hasSubmittedThisGame, setHasSubmittedThisGame] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedScore, setLastSubmittedScore] = useState<number | null>(null);
  
  const { 
    user: monadUser, 
    hasUsername, 
    isLoading: isLoadingUser 
  } = useMonadGamesUser(playerAddress);

  // Auto-submit score when game ends
  useEffect(() => {
    if (gameState === 'gameOver' && score > 0 && playerAddress && !hasSubmittedThisGame && !isSubmitting) {
      submitScore(score);
    }

    // Reset submission flag when new game starts
    if (gameState === 'playing') {
      setHasSubmittedThisGame(false);
    }
  }, [gameState, score, playerAddress, hasSubmittedThisGame, isSubmitting]);

  const submitScore = async (scoreAmount: number) => {
    if (!playerAddress || scoreAmount <= 0) return;

    setIsSubmitting(true);
    console.log('🎮 Submitting score to Monad Games ID...', { score: scoreAmount, playerAddress });

    try {
      // Get session token
      const sessionTokenResponse = await fetch('/api/get-session-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerAddress,
          message: `Authenticate for Monad Games ID score submission\nAddress: ${playerAddress}\nTimestamp: ${Date.now()}`,
          signedMessage: "development_mode",
        }),
      });

      const sessionData = await sessionTokenResponse.json();
      if (!sessionData.success) {
        console.error('Failed to get session token');
        return;
      }

      // Submit score
      const response = await fetch('/api/update-player-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerAddress,
          scoreAmount,
          transactionAmount: 1,
          sessionToken: sessionData.sessionToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLastSubmittedScore(scoreAmount);
        setHasSubmittedThisGame(true);
        onScoreSubmitted?.(scoreAmount);
        console.log('✅ Score submitted successfully to Monad Games ID:', result);
        
        if (result.transactionHash) {
          console.log(`Transaction confirmed: https://testnet.monadexplorer.com/tx/${result.transactionHash}`);
        }
      } else {
        console.error('❌ Failed to submit score to Monad Games ID:', result.error);
      }
    } catch (error) {
      console.error('Error submitting score to Monad Games ID:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!playerAddress) {
    return null;
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Player:</span>
          <span className="text-sm text-orange-400 font-mono">
            {`${playerAddress.slice(0, 6)}...${playerAddress.slice(-4)}`}
          </span>
        </div>

        {/* Monad Games ID Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Monad ID:</span>
          <div className="flex items-center space-x-2">
            {hasUsername && monadUser ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">{monadUser.username}</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <a 
                  href="https://monad-games-id-site.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-yellow-400 hover:text-yellow-300 underline"
                >
                  Register Username
                </a>
              </>
            )}
          </div>
        </div>

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
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600">
        <a
          href="https://monad-games-id-site.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs text-orange-400 hover:text-orange-300 transition-colors text-center"
        >
          View on Monad Games ID →
        </a>
      </div>
    </div>
  );
}