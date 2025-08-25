interface GameInstructionsProps {
  isVisible: boolean;
}

export default function GameInstructions({ isVisible }: GameInstructionsProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 text-white max-w-xs md:max-w-sm border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-3 md:mb-4">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center mr-2 md:mr-3 shadow-lg">
          <span className="text-lg md:text-xl">🎯</span>
        </div>
        <div className="font-bold text-lg md:text-xl text-yellow-400">Cara Main</div>
      </div>
      <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/90">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
          <span className="hidden md:inline">Click and hold the basketball</span>
          <span className="md:hidden">Tekan dan tahan bola</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
          <span className="hidden md:inline">Drag to aim at the glowing hoop</span>
          <span className="md:hidden">Geser untuk bidik ring</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
          <span className="hidden md:inline">Release to shoot!</span>
          <span className="md:hidden">Lepas untuk tembak!</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
          <span className="hidden md:inline">Score as many as possible!</span>
          <span className="md:hidden">Raih skor tertinggi!</span>
        </div>
      </div>
    </div>
  );
}