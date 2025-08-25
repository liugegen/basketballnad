'use client';

interface MobileGameControlsProps {
  score: number;
  timeLeft: number;
  gameState: string;
  onReset: () => void;
  onPause?: () => void;
}

export default function MobileGameControls({
  score,
  timeLeft,
  gameState,
  onReset,
  onPause
}: MobileGameControlsProps) {
  if (gameState !== 'playing') return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden">
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
        <div className="flex justify-between items-center">
          {/* Score */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{score}</div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Score</div>
          </div>

          {/* Time */}
          <div className="text-center">
            <div className={`text-3xl font-bold mb-1 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Time</div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            {onPause && (
              <button
                onClick={onPause}
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-2 rounded-xl text-sm border border-yellow-500/30 transition-all duration-200 active:scale-95"
              >
                ⏸️
              </button>
            )}
            
            <button
              onClick={onReset}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-xl text-sm border border-red-500/30 transition-all duration-200 active:scale-95"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 bg-gray-700/50 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}