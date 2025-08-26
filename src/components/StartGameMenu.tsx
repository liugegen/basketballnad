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
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-500/20 shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <span className="text-2xl">🎮</span>
            </div>
            <h3 className="text-2xl font-bold text-white">How to Play</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-white/90">
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl mb-2">🏀</div>
              <div className="font-semibold mb-1">Press & Point</div>
              <p className="text-sm text-gray-300">Drag the ball towards the ring</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold mb-1">Release & Shoot</div>
              <p className="text-sm text-gray-300">Release to shoot</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-semibold mb-1">60 Seconds</div>
              <p className="text-sm text-gray-300">Game duration</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold mb-1">High Score</div>
              <p className="text-sm text-gray-300">Score as many as possible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}