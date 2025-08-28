import { ReactNode } from 'react';

interface BasketballCourtProps {
  children: ReactNode;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  gameAreaRef: React.RefObject<HTMLDivElement | null>;
}

export default function BasketballCourt({
  children,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  gameAreaRef
}: BasketballCourtProps) {
  return (
    <div
      ref={gameAreaRef}
      className="relative w-full max-w-6xl h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl md:rounded-[2rem] border-2 md:border-4 border-purple-400/30 shadow-[0_0_30px_rgba(147,51,234,0.3)] md:shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden cursor-crosshair transform hover:scale-[1.01] transition-all duration-500 backdrop-blur-sm touch-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #581c87 75%, #6b21a8 100%)',
        boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Basketball Court Design - Dark Purple Theme */}
      <div className="absolute inset-0">
        {/* Court floor with subtle texture effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent transform rotate-45"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent transform -rotate-45"></div>
        </div>

        {/* Court lines with purple glow effect - Responsive */}
        <div className="absolute bottom-0 left-0 right-0 h-2 md:h-3 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-t-full"></div>
        <div className="absolute bottom-16 md:bottom-24 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-1 md:h-2 bg-white/95 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]"></div>

        {/* Three-point line */}
        <div className="absolute bottom-20 md:bottom-32 left-1/2 transform -translate-x-1/2 w-48 md:w-80 h-0.5 md:h-1 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>

        {/* Side lines */}
        <div className="absolute bottom-32 md:bottom-48 left-1/5 w-1 md:w-2 h-16 md:h-24 bg-white/70 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
        <div className="absolute bottom-32 md:bottom-48 right-1/5 w-1 md:w-2 h-16 md:h-24 bg-white/70 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>

        {/* Center circle */}
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 md:w-32 h-20 md:h-32 border-1 md:border-2 border-white/50 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 md:w-4 h-2 md:h-4 bg-white/80 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>

        {/* Additional purple accent elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-purple-800/10"></div>
      </div>

      {children}
    </div>
  );
}