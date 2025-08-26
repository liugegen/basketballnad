import { useState, useEffect } from 'react';
import { useBlockchainScoreSubmission } from '@/hooks/useBlockchainScoreSubmission';

interface ScoreSyncStatusProps {
  playerAddress: string;
  currentGameScore: number;
  gameState: 'menu' | 'playing' | 'gameOver';
}

export default function ScoreSyncStatus({ playerAddress, currentGameScore, gameState }: ScoreSyncStatusProps) {
  const { isSubmitting, submitError, submitScore } = useBlockchainScoreSubmission();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (gameState === 'gameOver' && currentGameScore > 0 && playerAddress) {
      // Automatically submit score when game ends
      setSyncStatus('submitting');

      submitScore(playerAddress, currentGameScore).then((success) => {
        if (success) {
          setSyncStatus('success');
          // Hide success message after 3 seconds
          setTimeout(() => setSyncStatus('idle'), 3000);
        } else {
          setSyncStatus('error');
          // Hide error message after 5 seconds
          setTimeout(() => setSyncStatus('idle'), 5000);
        }
      });
    }
  }, [gameState, currentGameScore, playerAddress, submitScore]);

  if (!playerAddress || syncStatus === 'idle') return null;

  const getStatusContent = () => {
    switch (syncStatus) {
      case 'submitting':
        return {
          icon: <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>,
          text: 'Submitting score to blockchain...',
          textColor: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20 border-yellow-500/30'
        };
      case 'success':
        return {
          icon: <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">✓</div>,
          text: `Score ${currentGameScore} submitted to blockchain!`,
          textColor: 'text-green-400',
          bgColor: 'bg-green-500/20 border-green-500/30'
        };
      case 'error':
        return {
          icon: <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</div>,
          text: submitError || 'Failed to submit score',
          textColor: 'text-red-400',
          bgColor: 'bg-red-500/20 border-red-500/30'
        };
      default:
        return null;
    }
  };

  const statusContent = getStatusContent();
  if (!statusContent) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className={`backdrop-blur-sm rounded-xl p-4 border min-w-[280px] ${statusContent.bgColor}`}>
        <div className="flex items-center gap-3">
          {statusContent.icon}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-300">Current Game Score:</span>
              <span className="text-sm font-semibold text-white">{currentGameScore}</span>
            </div>
            <span className={`text-sm ${statusContent.textColor}`}>
              {statusContent.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}