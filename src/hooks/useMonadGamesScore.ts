import { useState, useEffect, useCallback } from 'react';

interface UserScoreData {
  totalScore: number;
  gamesPlayed: number;
}

interface UseMonadGamesScoreReturn {
  totalScore: number;
  gamesPlayed: number;
  isLoading: boolean;
  error: string | null;
  refreshScore: () => void;
}

export function useMonadGamesScore(walletAddress: string): UseMonadGamesScoreReturn {
  const [totalScore, setTotalScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScoreData = useCallback(async () => {
    if (!walletAddress) {
      setTotalScore(0);
      setGamesPlayed(0);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Try to fetch user's specific score data first
      const userScoreResponse = await fetch(
        `https://monad-games-id-api.vercel.app/api/user-score?wallet=${walletAddress}`
      );

      if (userScoreResponse.ok) {
        const userData: UserScoreData = await userScoreResponse.json();
        setTotalScore(userData.totalScore || 0);
        setGamesPlayed(userData.gamesPlayed || 0);
      } else {
        // Fallback: fetch from leaderboard data
        const leaderboardResponse = await fetch(
          'https://monad-games-id-api.vercel.app/api/leaderboard'
        );

        if (!leaderboardResponse.ok) {
          throw new Error(`HTTP error! status: ${leaderboardResponse.status}`);
        }

        const leaderboardData: Array<{
          walletAddress: string;
          totalScore: number;
          gamesPlayed: number;
        }> = await leaderboardResponse.json();

        // Find user's entry in leaderboard
        const userEntry = leaderboardData.find(
          entry => entry.walletAddress.toLowerCase() === walletAddress.toLowerCase()
        );

        if (userEntry) {
          setTotalScore(userEntry.totalScore || 0);
          setGamesPlayed(userEntry.gamesPlayed || 0);
        } else {
          // User not found, set to 0
          setTotalScore(0);
          setGamesPlayed(0);
        }
      }
    } catch (err) {
      console.error('Error fetching score data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch score data');
      setTotalScore(0);
      setGamesPlayed(0);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchScoreData();
  }, [fetchScoreData]);

  const refreshScore = () => {
    fetchScoreData();
  };

  return {
    totalScore,
    gamesPlayed,
    isLoading,
    error,
    refreshScore,
  };
}