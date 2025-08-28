interface StartGameMenuProps {
  onStartGame: () => void;
}

export default function StartGameMenu({ onStartGame }: StartGameMenuProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
      <div className="text-center max-w-2xl w-full">


        {/* Main Start Button - Centered and Prominent */}
        <div className="relative mb-12">
          <button
            onClick={() => {
              console.log('Start Game button clicked!');
              onStartGame();
            }}
            className="group relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white font-black py-8 px-16 rounded-3xl text-3xl shadow-[0_0_50px_rgba(34,197,94,0.6)] transform hover:scale-110 hover:shadow-[0_0_80px_rgba(34,197,94,0.8)] transition-all duration-500 border-4 border-green-300/30 backdrop-blur-sm w-full max-w-lg mx-auto cursor-pointer animate-pulse"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl md:rounded-3xl"></div>
            <div className="relative flex items-center justify-center space-x-4">
              <span className="text-4xl animate-bounce">🏀</span>
              <span className="tracking-wider text-3xl font-extrabold">START GAME</span>
              <span className="text-4xl animate-bounce delay-300">🎯</span>
            </div>

            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>
          </button>

          {/* Floating elements around button - Hidden on mobile */}
          <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 bg-purple-400/60 rounded-full animate-float"></div>
          <div className="hidden md:block absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-400/60 rounded-full animate-float delay-1000"></div>
          <div className="hidden md:block absolute top-1/2 -right-8 w-4 h-4 bg-violet-400/60 rounded-full animate-float delay-500"></div>
        </div>



        {/* Simple Instructions */}
        <div className="backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(49, 46, 129, 0.6) 100%)'
        }}>
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <span className="text-2xl">🎮</span>
            </div>
            <h3 className="text-2xl font-bold text-white">How to Play</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-white/90">
            <div className="text-center p-4 rounded-xl border border-purple-400/20" style={{
              background: 'rgba(147, 51, 234, 0.1)'
            }}>
              <div className="text-3xl mb-2">🏀</div>
              <div className="font-semibold mb-1 text-white">Press & Point</div>
              <p className="text-sm text-purple-200/80">Drag the ball towards the ring</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-purple-400/20" style={{
              background: 'rgba(147, 51, 234, 0.1)'
            }}>
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold mb-1 text-white">Release & Shoot</div>
              <p className="text-sm text-purple-200/80">Release to shoot</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-purple-400/20" style={{
              background: 'rgba(147, 51, 234, 0.1)'
            }}>
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-semibold mb-1 text-white">60 Seconds</div>
              <p className="text-sm text-purple-200/80">Game duration</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-purple-400/20" style={{
              background: 'rgba(147, 51, 234, 0.1)'
            }}>
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold mb-1 text-white">High Score</div>
              <p className="text-sm text-purple-200/80">Score as many as possible</p>
            </div>
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
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
            <p className="text-xs text-white/40">BasketNad © 2025 • Powered by Monad Network</p>
          </div>
        </div>
      </div>
    </div>
  );
}