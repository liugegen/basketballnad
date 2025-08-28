interface GameOverModalProps {
  score: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function GameOverModal({ score, onPlayAgain, onMainMenu }: GameOverModalProps) {
  const getPerformanceMessage = (score: number) => {
    if (score >= 20) return "🔥 Amazing! You're a basketball legend!";
    if (score >= 15) return "🎯 Great job! Excellent shooting skills!";
    if (score >= 10) return "👏 Good! Keep practicing!";
    if (score >= 5) return "💪 Not bad! You're getting the hang of it!";
    return "🏀 Keep trying! Practice makes perfect!";
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in p-4" style={{
      background: 'rgba(30, 27, 75, 0.95)'
    }}>
      <div className="relative rounded-2xl md:rounded-[2rem] p-6 md:p-12 text-center shadow-[0_0_80px_rgba(147,51,234,0.5)] max-w-2xl w-full border border-purple-400/30 transform animate-scale-in max-h-[90vh] overflow-y-auto" style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(49, 46, 129, 0.8) 50%, rgba(76, 29, 149, 0.9) 100%)'
      }}>
        {/* Decorative elements - Hidden on mobile */}
        <div className="hidden md:block absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl rotate-12 animate-float"></div>
        <div className="hidden md:block absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl -rotate-12 animate-float delay-500"></div>
        <div className="hidden md:block absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg rotate-45 animate-float delay-1000"></div>

        {/* Basketball icon with animation */}
        <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce-slow">🏀</div>

        {/* Game Over title */}
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-indigo-300 mb-4 md:mb-6 animate-gradient-x">
          GAME OVER!
        </h2>

        {/* Score display */}
        <div className="mb-6 md:mb-8">
          <p className="text-lg md:text-2xl text-white/90 mb-2 md:mb-4 font-medium">Final Score</p>
          <div className="relative">
            <p className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-indigo-300 mb-2 animate-pulse-gentle">
              {score}
            </p>
            <div className="absolute inset-0 text-6xl md:text-8xl font-black text-purple-400/20 blur-sm animate-pulse">
              {score}
            </div>
          </div>
          <p className="text-lg md:text-xl text-white/70">points scored</p>
        </div>

        {/* Performance message */}
        <div className="mb-6 md:mb-8 p-3 md:p-4 rounded-xl md:rounded-2xl border border-purple-400/30" style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)'
        }}>
          <p className="text-sm md:text-lg text-white/90">
            {getPerformanceMessage(score)}
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 md:space-y-4">
          <button
            onClick={onPlayAgain}
            className="group w-full text-white font-black py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl text-lg md:text-2xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-400/30"
            style={{
              background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6366f1 100%)',
              boxShadow: '0 0 30px rgba(147, 51, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(147, 51, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.4)';
            }}
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <span className="text-2xl md:text-3xl group-hover:animate-spin">🔄</span>
              <span>PLAY AGAIN</span>
            </div>
          </button>

          <button
            onClick={onMainMenu}
            className="group w-full text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-purple-400/20"
            style={{
              background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)'
            }}
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <span className="text-xl md:text-2xl group-hover:animate-bounce">🏠</span>
              <span>MAIN MENU</span>
            </div>
          </button>
        </div>

        {/* Footer with GitHub link */}
        <div className="mt-6 pt-4 border-t border-purple-400/20 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-xs text-white/50">Open Source on</span>
            <a
              href="https://github.com/liugegen/basketballnad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-medium text-purple-300 hover:text-white transition-colors duration-200"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
          <p className="text-xs text-white/40">BasketNad © 2025 • Powered by Monad Network</p>
        </div>
      </div>
    </div>
  );
}