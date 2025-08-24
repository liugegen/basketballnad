interface GameInstructionsProps {
  isVisible: boolean;
}

export default function GameInstructions({ isVisible }: GameInstructionsProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-8 left-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl p-6 text-white max-w-sm border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <span className="text-xl">🎯</span>
        </div>
        <div className="font-bold text-xl text-yellow-400">How to Play</div>
      </div>
      <div className="space-y-3 text-sm text-white/90">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <span>Click and hold the basketball</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <span>Drag to aim at the glowing hoop</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <span>Release to shoot!</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <span>Score as many as possible!</span>
        </div>
      </div>
    </div>
  );
}