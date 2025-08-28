interface GameHUDProps {
  score: number;
  timeLeft: number;
}

export default function GameHUD({ score, timeLeft }: GameHUDProps) {
  return (
    <div className="flex justify-between items-center w-full max-w-6xl mb-8 relative z-10">
      {/* Score Card */}
      <div className="backdrop-blur-xl rounded-3xl p-6 border border-purple-400/30 shadow-2xl transform hover:scale-105 transition-all duration-300" style={{
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)'
      }}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <div className="text-purple-200 text-sm font-medium uppercase tracking-wider">Score</div>
            <div className="text-white text-4xl font-black">{score}</div>
            <div className="text-purple-300/60 text-xs">points</div>
          </div>
        </div>
      </div>

      {/* Timer Card */}
      <div className="backdrop-blur-xl rounded-3xl p-6 border shadow-2xl transform hover:scale-105 transition-all duration-300" style={{
        background: timeLeft <= 10 
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(244, 63, 94, 0.15) 100%)'
          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
        borderColor: timeLeft <= 10 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(99, 102, 241, 0.3)'
      }}>
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${timeLeft <= 10 ? 'animate-pulse' : ''}`} style={{
            background: timeLeft <= 10 
              ? 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
          }}>
            <span className="text-2xl">⏱️</span>
          </div>
          <div>
            <div className={`${timeLeft <= 10 ? 'text-red-200' : 'text-indigo-200'} text-sm font-medium uppercase tracking-wider`}>Time</div>
            <div className={`text-white text-4xl font-black ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>{timeLeft}</div>
            <div className={`${timeLeft <= 10 ? 'text-red-300/60' : 'text-indigo-300/60'} text-xs`}>seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}