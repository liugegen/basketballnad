import { useState, useEffect } from 'react';
import { useMonadGamesScore } from '@/hooks/useMonadGamesScore';

interface ScoreSyncStatusProps {
  playerAddress: string;
  currentGameScore: number;
  gameState: 'menu' | 'playing' | 'gameOver';
}

export default function ScoreSyncStatus({ playerAddress, currentGameScore, gameState }: ScoreSyncStatusProps) {
  const { totalScore, refreshScore, isLoading } = useMonadGamesScore(playerAddress);
  const [showSyncIndicator, setShowSyncIndicator] = useState(false);

  useEffect(() => {
    if (gameState === 'gameOver' && currentGameScore > 0) {
      // Show sync indicator when game ends
      setShowSyncIndicator(true);

      // Refresh score after a delay to allow for API sync
      const timer = setTimeout(() => {
        refreshScore();
        setShowSyncIndicator(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [gameState, currentGameScore, refreshScore]);

  if (!playerAddress) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-white/10 min-w-[200px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Score Status</span>
          {showSyncIndicator && (
            <div className="flex items-center gap-1">
              <div className="animate-spin w-3 h-3 border border-yellow-400 border-t-transparent rounded-full"></div>
              <span className="text-xs text-yellow-400">Syncing...</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-300">Current Game:</span>
            <span className="text-sm font-semibold text-white">{currentGameScore}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-300">Total Score:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-400">
                {isLoading ? '...' : totalScore.toLocaleString()}
              </span>
              <button
                onClick={refreshScore}
                disabled={isLoading}
                className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-50"
                title="Refresh"
              >
                🔄
              </button>
            </div>
          </div>

          {gameState === 'gameOver' && currentGameScore > 0 && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">
                  Score will sync to Monad Games ID
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}