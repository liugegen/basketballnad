import MonadGamesStatus from './MonadGamesStatus';

interface StartGameMenuProps {
  onStartGame: () => void;
}

export default function StartGameMenu({ onStartGame }: StartGameMenuProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
      <div className="text-center max-w-4xl w-full">
        {/* Monad Games ID Status */}
        <div className="mb-8">
          <MonadGamesStatus />
        </div>

        {/* Main Start Button */}
        <div className="relative mb-8 md:mb-12">
          <button
            onClick={onStartGame}
            className="group relative bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:via-indigo-700 hover:to-violet-700 text-white font-black py-6 px-12 md:py-8 md:px-16 rounded-2xl md:rounded-3xl text-xl md:text-3xl shadow-[0_0_40px_rgba(147,51,234,0.4)] transform hover:scale-110 hover:shadow-[0_0_60px_rgba(147,51,234,0.6)] transition-all duration-500 border-2 md:border-4 border-purple-300/20 backdrop-blur-sm w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl md:rounded-3xl"></div>
            <div className="relative flex items-center justify-center space-x-2 md:space-x-4">
              <span className="text-2xl md:text-4xl animate-bounce">🏀</span>
              <span className="tracking-wider text-lg md:text-3xl">MULAI MAIN</span>
              <span className="text-2xl md:text-4xl animate-bounce delay-300">🎯</span>
            </div>

            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
          </button>

          {/* Floating elements around button - Hidden on mobile */}
          <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 bg-purple-400/60 rounded-full animate-float"></div>
          <div className="hidden md:block absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-400/60 rounded-full animate-float delay-1000"></div>
          <div className="hidden md:block absolute top-1/2 -right-8 w-4 h-4 bg-violet-400/60 rounded-full animate-float delay-500"></div>
        </div>

        {/* Instructions Panel - Responsive */}
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.3)] max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center mr-2 md:mr-4 shadow-lg shadow-purple-500/30">
              <span className="text-lg md:text-2xl">🎮</span>
            </div>
            <h3 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Cara Bermain</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-white/90">
            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-purple-400/30 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-3">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <span className="text-lg md:text-2xl">🏀</span>
                </div>
                <div className="text-sm md:text-lg font-bold text-purple-200">Tekan & Bidik</div>
              </div>
              <p className="text-xs md:text-sm text-purple-100/80">Tekan dan geser bola basket untuk membidik ring yang bercahaya</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-600/20 to-violet-600/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-indigo-400/30 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
              <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-3">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <span className="text-lg md:text-2xl">🎯</span>
                </div>
                <div className="text-sm md:text-lg font-bold text-indigo-200">Lepas & Tembak</div>
              </div>
              <p className="text-xs md:text-sm text-indigo-100/80">Lepaskan untuk menembak bola dengan fisika yang realistis</p>
            </div>

            <div className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-violet-400/30 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
              <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-3">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-lg md:text-2xl">⏱️</span>
                </div>
                <div className="text-sm md:text-lg font-bold text-violet-200">Tantangan Waktu</div>
              </div>
              <p className="text-xs md:text-sm text-violet-100/80">Cetak skor sebanyak mungkin dalam 60 detik</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-purple-400/30 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-3">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <span className="text-lg md:text-2xl">🏆</span>
                </div>
                <div className="text-sm md:text-lg font-bold text-purple-200">Raih Poin</div>
              </div>
              <p className="text-xs md:text-sm text-purple-100/80">Setiap tembakan sukses memberikan 1 poin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}