interface GameHUDProps {
  score: number;
  timeLeft: number;
}

export default function GameHUD({ score, timeLeft }: GameHUDProps) {
  return (
    <div className="flex justify-between items-center w-full max-w-6xl mb-8 relative z-10">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-6 border border-orange-400/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <div className="text-orange-200 text-sm font-medium uppercase tracking-wider">Score</div>
            <div className="text-white text-4xl font-black">{score}</div>
            <div className="text-orange-300/60 text-xs">points</div>
          </div>
        </div>
      </div>

      {/* Timer Card */}
      <div className={`bg-gradient-to-br ${timeLeft <= 10 ? 'from-red-500/20 to-pink-500/20 border-red-400/30' : 'from-green-500/20 to-emerald-500/20 border-green-400/30'} backdrop-blur-xl rounded-3xl p-6 border shadow-2xl transform hover:scale-105 transition-all duration-300`}>
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${timeLeft <= 10 ? 'from-red-400 to-pink-500' : 'from-green-400 to-emerald-500'} rounded-2xl flex items-center justify-center shadow-lg ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
            <span className="text-2xl">⏱️</span>
          </div>
          <div>
            <div className={`${timeLeft <= 10 ? 'text-red-200' : 'text-green-200'} text-sm font-medium uppercase tracking-wider`}>Time</div>
            <div className={`text-white text-4xl font-black ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>{timeLeft}</div>
            <div className={`${timeLeft <= 10 ? 'text-red-300/60' : 'text-green-300/60'} text-xs`}>seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}