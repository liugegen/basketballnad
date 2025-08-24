'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useState, useCallback } from 'react';

export interface GameSubmission {
  // Game identification
  name: string;
  description: string;
  version: string;
  category: string;
  tags: string[];
  
  // Developer information
  developer: {
    name: string;
    url: string;
  };
  
  // Game session data
  playerAddress: string;
  score: number;
  timestamp: number;
  
  // Network information
  chainId: number;
  chainName: string;
}

export function useMonadGamesId() {
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedScore, setLastSubmittedScore] = useState<number | null>(null);

  const submitScore = useCallback(async (score: number): Promise<boolean> => {
    if (!authenticated || !ready || isSubmitting || score <= 0) {
      return false;
    }

    const wallet = wallets[0];
    if (!wallet?.address) {
      console.error('No wallet address available');
      return false;
    }

    setIsSubmitting(true);
    console.log('🎮 Submitting score to Monad Games ID...', { score, walletAddress: wallet.address });

    try {
      const gameResult = {
        // Game identification
        name: process.env.NEXT_PUBLIC_GAME_NAME || 'BasketNad',
        description: process.env.NEXT_PUBLIC_GAME_DESCRIPTION || 'Professional Basketball Game on Monad',
        version: process.env.NEXT_PUBLIC_GAME_VERSION || '1.0.0',
        category: process.env.NEXT_PUBLIC_GAME_CATEGORY || 'Sports',
        tags: process.env.NEXT_PUBLIC_GAME_TAGS?.split(',') || ['basketball', 'sports', 'arcade'],
        
        // Developer information
        developer: {
          name: process.env.NEXT_PUBLIC_DEVELOPER_NAME || 'BasketNad Team',
          url: process.env.NEXT_PUBLIC_DEVELOPER_URL || 'https://basketnad.vercel.app',
        },
        
        // Game session data
        playerAddress: wallet.address,
        score,
        timestamp: Date.now(),
        
        // Network information
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '41454'),
        chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Monad Testnet',
      };

      // Submit to Monad Games ID - following the pattern from successful repo
      const monadGamesApiUrl = process.env.NEXT_PUBLIC_MONAD_GAMES_ID_API_URL;
      if (!monadGamesApiUrl) {
        console.error('NEXT_PUBLIC_MONAD_GAMES_ID_API_URL is not configured');
        return false;
      }

      const response = await fetch(`${monadGamesApiUrl}/submit-game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameResult),
      });

      if (response.ok) {
        const result = await response.json();
        setLastSubmittedScore(score);
        console.log('✅ Score submitted successfully to Monad Games ID:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to submit score to Monad Games ID:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          gameData: gameResult
        });
        return false;
      }
    } catch (error) {
      console.error('Error submitting score to Monad Games ID:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [authenticated, ready, wallets, isSubmitting]);

  const getLeaderboard = useCallback(async () => {
    try {
      const monadGamesApiUrl = process.env.NEXT_PUBLIC_MONAD_GAMES_ID_API_URL;
      if (!monadGamesApiUrl) {
        console.error('NEXT_PUBLIC_MONAD_GAMES_ID_API_URL is not configured');
        return null;
      }

      const gameName = process.env.NEXT_PUBLIC_GAME_NAME || 'BasketNad';
      const response = await fetch(`${monadGamesApiUrl}/leaderboard?game=${encodeURIComponent(gameName)}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch leaderboard:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
    return null;
  }, []);

  return {
    ready,
    authenticated,
    user,
    walletAddress: wallets[0]?.address,
    isSubmitting,
    lastSubmittedScore,
    submitScore,
    getLeaderboard,
  };
}