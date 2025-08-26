// This hook is kept for backward compatibility but simplified
// since we're now focusing on automatic score submission
export function useMonadGamesScore(walletAddress: string) {
  // Simplified version - just return empty data since we're not displaying total scores
  return {
    totalScore: 0,
    gamesPlayed: 0,
    isLoading: false,
    error: null,
    refreshScore: () => {
      // No-op since we're not fetching total scores anymore
      console.log('Score refresh requested for:', walletAddress);
    },
  };
}