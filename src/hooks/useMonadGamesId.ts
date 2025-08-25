'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useState, useCallback, useEffect } from 'react';

interface ScoreSubmissionResponse {
  success: boolean;
  transactionHash?: string;
  message?: string;
  error?: string;
}

export function useMonadGamesId() {
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedScore, setLastSubmittedScore] = useState<number | null>(null);

  // Get session token for authenticated requests
  const getSessionToken = useCallback(async (playerAddress: string): Promise<string | null> => {
    try {
      // In a real implementation, you would sign a message with the user's wallet here
      const message = `Authenticate for score submission: ${playerAddress}`;
      const signedMessage = "dummy_signature"; // This should be replaced with actual wallet signing
      
      const response = await fetch('/api/get-session-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerAddress,
          message,
          signedMessage,
        }),
      });

      const data = await response.json();
      if (data.success) {
        return data.sessionToken;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting session token:', error);
      return null;
    }
  }, []);

  const submitScore = useCallback(async (scoreAmount: number): Promise<boolean> => {
    if (!authenticated || !ready || isSubmitting || scoreAmount <= 0) {
      return false;
    }

    const wallet = wallets[0];
    if (!wallet?.address) {
      console.error('No wallet address available');
      return false;
    }

    setIsSubmitting(true);
    console.log('🎮 Submitting score to Monad Games ID...', { score: scoreAmount, walletAddress: wallet.address });

    try {
      // Get session token
      const sessionToken = await getSessionToken(wallet.address);
      if (!sessionToken) {
        console.error('Failed to get session token');
        return false;
      }

      // Submit score using the same pattern as the successful example
      const response = await fetch('/api/update-player-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerAddress: wallet.address,
          scoreAmount,
          transactionAmount: 1, // Each game counts as 1 transaction
          sessionToken,
        }),
      });

      const result: ScoreSubmissionResponse = await response.json();

      if (result.success) {
        setLastSubmittedScore(scoreAmount);
        console.log('✅ Score submitted successfully to Monad Games ID:', result);
        
        // Log Monad testnet explorer link if transaction hash is available
        if (result.transactionHash) {
          console.log(`Transaction confirmed: https://testnet.monadexplorer.com/tx/${result.transactionHash}`);
        }
        
        return true;
      } else {
        console.error('❌ Failed to submit score to Monad Games ID:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Error submitting score to Monad Games ID:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [authenticated, ready, wallets, isSubmitting, getSessionToken]);

  // Get player's total data
  const getPlayerData = useCallback(async () => {
    const wallet = wallets[0];
    if (!wallet?.address) return null;

    try {
      const response = await fetch(`/api/get-player-data?address=${encodeURIComponent(wallet.address)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting player data:', error);
      return null;
    }
  }, [wallets]);

  // Load last submitted score on mount
  useEffect(() => {
    if (authenticated && wallets[0]?.address) {
      getPlayerData().then((data) => {
        if (data?.success && data.score) {
          // Convert from wei/string to number if needed
          const score = typeof data.score === 'string' ? 
            parseInt(data.score) : data.score;
          setLastSubmittedScore(score);
        }
      });
    }
  }, [authenticated, wallets, getPlayerData]);

  return {
    ready,
    authenticated,
    user,
    walletAddress: wallets[0]?.address,
    isSubmitting,
    lastSubmittedScore,
    submitScore,
    getPlayerData,
  };
}