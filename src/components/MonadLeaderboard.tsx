'use client';

import { useEffect, useState, useCallback } from 'react';
import { useMonadGamesId } from '@/hooks/useMonadGamesId';

interface LeaderboardEntry {
  playerAddress: string;
  score: number;
  timestamp: number;
  rank: number;
}

export default function MonadLeaderboard() {
  const { getLeaderboard, walletAddress } = useMonadGamesId();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard();
      if (data && data.leaderboard) {
        setLeaderboard(data.leaderboard.slice(0, 10)); // Top 10
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [getLeaderboard]);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen, fetchLeaderboard]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isCurrentPlayer = (address: string) => {
    return walletAddress && address.toLowerCase() === walletAddress.toLowerCase();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
      >
        🏆 Leaderboard
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-black/90 backdrop-blur-sm rounded-xl border border-purple-500/30 shadow-2xl z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">🏆 Top Players</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={`${entry.playerAddress}-${entry.timestamp}`}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isCurrentPlayer(entry.playerAddress)
                        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className={`font-mono text-sm ${
                          isCurrentPlayer(entry.playerAddress) ? 'text-orange-400' : 'text-gray-300'
                        }`}>
                          {formatAddress(entry.playerAddress)}
                        </div>
                        {isCurrentPlayer(entry.playerAddress) && (
                          <div className="text-xs text-orange-500">You</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.score}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No scores yet. Be the first to play!
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-600">
              <button
                onClick={fetchLeaderboard}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}