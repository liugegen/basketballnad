import MonadGamesStatus from './MonadGamesStatus';

interface StartGameMenuProps {
  onStartGame: () => void;
}

export default function StartGameMenu({ onStartGame }: StartGameMenuProps) {
  return (
    <div className="mt-12 text-center max-w-4xl relative z-10">
      {/* Monad Games ID Status */}
      <MonadGamesStatus />
      
      {/* Main Start Button */}
      <div className="relative mb-12">
        <button
          onClick={onStartGame}
          className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-black py-8 px-16 rounded-3xl text-3xl shadow-[0_0_40px_rgba(251,146,60,0.4)] transform hover:scale-110 hover:shadow-[0_0_60px_rgba(251,146,60,0.6)] transition-all duration-500 border-4 border-white/20 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl"></div>
          <div className="relative flex items-center space-x-4">
            <span className="text-4xl animate-bounce">🏀</span>
            <span className="tracking-wider">START GAME</span>
            <span className="text-4xl animate-bounce delay-300">🎯</span>
          </div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
        </button>
        
        {/* Floating elements around button */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-400/60 rounded-full animate-float"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-red-400/60 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 -right-8 w-4 h-4 bg-yellow-400/60 rounded-full animate-float delay-500"></div>
      </div>
      
      {/* Instructions Panel */}
      <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <span className="text-2xl">🎮</span>
          </div>
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Game Instructions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-400/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏀</span>
              </div>
              <div className="text-lg font-bold text-orange-300">Drag & Aim</div>
            </div>
            <p className="text-white/80">Click and drag the basketball to aim at the glowing hoop</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-400/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-lg font-bold text-green-300">Release & Shoot</div>
            </div>
            <p className="text-white/80">Release to shoot the ball with realistic physics</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-400/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="text-lg font-bold text-blue-300">Time Challenge</div>
            </div>
            <p className="text-white/80">Score as many baskets as possible in 60 seconds</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-400/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-lg font-bold text-purple-300">Score Points</div>
            </div>
            <p className="text-white/80">Each successful shot earns you 1 point</p>
          </div>
        </div>
      </div>
    </div>
  );
}