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
      className="relative w-full max-w-6xl h-[600px] bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 rounded-[2rem] border-4 border-white/30 shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden cursor-crosshair transform hover:scale-[1.01] transition-all duration-500 backdrop-blur-sm"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 25%, #fdba74 50%, #fb923c 75%, #f97316 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Basketball Court Design */}
      <div className="absolute inset-0">
        {/* Court floor with wood texture effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-800/10 to-transparent transform rotate-45"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-800/10 to-transparent transform -rotate-45"></div>
        </div>
        
        {/* Court lines with glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] rounded-t-full"></div>
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-white/90 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
        
        {/* Three-point line */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-80 h-1 bg-white/70 rounded-full"></div>
        
        {/* Side lines */}
        <div className="absolute bottom-48 left-1/5 w-2 h-24 bg-white/60 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-48 right-1/5 w-2 h-24 bg-white/60 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
        
        {/* Center circle */}
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 border-2 border-white/40 rounded-full"></div>
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white/60 rounded-full"></div>
      </div>

      {children}
    </div>
  );
}