interface AimingGuideProps {
  isVisible: boolean;
}

export default function AimingGuide({ isVisible }: AimingGuideProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-8 right-8 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-xl rounded-2xl px-6 py-4 text-white font-bold border border-green-400/30 shadow-[0_0_25px_rgba(34,197,94,0.3)] animate-pulse-gentle">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-spin-slow">
          <span className="text-lg">🎯</span>
        </div>
        <div>
          <div className="text-lg font-black">AIMING...</div>
          <div className="text-sm text-green-100">Release to shoot!</div>
        </div>
      </div>
    </div>
  );
}