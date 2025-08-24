interface ScoreEffectProps {
  isVisible: boolean;
}

export default function ScoreEffect({ isVisible }: ScoreEffectProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
      <div className="text-center">
        <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-bounce-big drop-shadow-2xl mb-4">
          SWISH!
        </div>
        <div className="text-6xl mb-4 animate-spin-once">🎉</div>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-3xl font-black px-8 py-4 rounded-2xl shadow-2xl animate-pulse-gentle">
          +1 POINT!
        </div>
        {/* Particle effects */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-particle"
              style={{
                left: `${(i - 3) * 20}px`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}