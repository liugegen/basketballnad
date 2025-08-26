import { useMonadGamesScore } from '@/hooks/useMonadGamesScore';

interface TotalScoreDisplayProps {
  playerAddress: string;
  className?: string;
}

export default function TotalScoreDisplay({ playerAddress, className = "" }: TotalScoreDisplayProps) {
  const { totalScore, gamesPlayed, isLoading, refreshScore } = useMonadGamesScore(playerAddress);

  if (!playerAddress) return null;

  return (
    <div className={`bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {isLoading ? (
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
              {isLoading ? '...' : gamesPlayed}
            </div>
            <div className="text-xs text-blue-300">Games</div>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={refreshScore}
          disabled={isLoading}
          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-2 rounded-lg transition-colors border border-green-500/30 disabled:opacity-50"
          title="Refresh Score"
        >
          <span className={`text-sm ${isLoading ? 'animate-spin' : ''}`}>
            🔄
          </span>
        </button>
      </div>
      
      <div className="mt-2 pt-2 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-green-400">
            Synced with Monad Games ID
          </span>
        </div>
      </div>
    </div>
  );
}