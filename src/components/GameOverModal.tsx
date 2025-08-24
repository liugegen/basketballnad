interface GameOverModalProps {
  score: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function GameOverModal({ score, onPlayAgain, onMainMenu }: GameOverModalProps) {
  const getPerformanceMessage = (score: number) => {
    if (score >= 20) return "🔥 Amazing! You're a basketball legend!";
    if (score >= 15) return "🎯 Great job! Excellent shooting skills!";
    if (score >= 10) return "👏 Good work! Keep practicing!";
    if (score >= 5) return "💪 Not bad! You're getting the hang of it!";
    return "🏀 Keep trying! Practice makes perfect!";
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2rem] p-12 text-center shadow-[0_0_80px_rgba(0,0,0,0.5)] max-w-2xl mx-4 border border-white/10 transform animate-scale-in">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl -rotate-12 animate-float delay-500"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg rotate-45 animate-float delay-1000"></div>
        
        {/* Basketball icon with animation */}
        <div className="text-8xl mb-6 animate-bounce-slow">🏀</div>
        
        {/* Game Over title */}
        <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 mb-6 animate-gradient-x">
          GAME OVER!
        </h2>
        
        {/* Score display */}
        <div className="mb-8">
          <p className="text-2xl text-white/70 mb-4 font-medium">Final Score</p>
          <div className="relative">
            <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2 animate-pulse-gentle">
              {score}
            </p>
            <div className="absolute inset-0 text-8xl font-black text-orange-500/20 blur-sm animate-pulse">
              {score}
            </div>
          </div>
          <p className="text-xl text-white/60">points scored</p>
        </div>
        
        {/* Performance message */}
        <div className="mb-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/20">
          <p className="text-lg text-white/80">
            {getPerformanceMessage(score)}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="group w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-black py-6 px-8 rounded-2xl text-2xl shadow-[0_0_30px_rgba(251,146,60,0.4)] transform hover:scale-105 hover:shadow-[0_0_50px_rgba(251,146,60,0.6)] transition-all duration-300 border-2 border-white/20"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-3xl group-hover:animate-spin">🔄</span>
              <span>PLAY AGAIN</span>
            </div>
          </button>
          
          <button
            onClick={onMainMenu}
            className="group w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/10"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl group-hover:animate-bounce">🏠</span>
              <span>MAIN MENU</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}