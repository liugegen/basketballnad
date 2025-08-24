interface BasketballProps {
  position: { x: number; y: number };
  size: number;
  isDragging: boolean;
  isThrowing: boolean;
  ballRef: React.RefObject<HTMLDivElement | null>;
}

export default function Basketball({ 
  position, 
  size, 
  isDragging, 
  isThrowing, 
  ballRef 
}: BasketballProps) {
  return (
    <div
      ref={ballRef}
      className={`absolute rounded-full cursor-grab transition-all duration-300 ${
        isDragging 
          ? 'scale-130 cursor-grabbing shadow-[0_0_40px_rgba(251,146,60,0.8)] ring-4 ring-yellow-400/70 animate-bounce-subtle' 
          : 'hover:scale-115 hover:shadow-[0_0_30px_rgba(251,146,60,0.6)]'
      } ${isThrowing ? 'transition-none shadow-[0_0_20px_rgba(251,146,60,0.4)]' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        zIndex: 20,
        background: 'radial-gradient(circle at 30% 30%, #fed7aa, #fb923c, #ea580c, #c2410c)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.2)',
        border: '3px solid #9a3412'
      }}
    >
      {/* Basketball texture lines with better styling */}
      <div className="absolute inset-0 rounded-full">
        {/* Main cross lines - Adjusted for smaller ball */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-900 to-transparent transform -translate-y-1/2 rounded-full shadow-sm"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-900 to-transparent transform -translate-x-1/2 rounded-full shadow-sm"></div>
        
        {/* Curved lines for more realistic look */}
        <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-orange-800/80 to-transparent rounded-full transform rotate-45"></div>
        <div className="absolute top-3/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-orange-800/80 to-transparent rounded-full transform -rotate-45"></div>
        
        {/* Additional curved lines */}
        <div className="absolute top-1/3 left-1/6 right-1/6 h-0.5 bg-orange-800/60 rounded-full transform rotate-12 opacity-70"></div>
        <div className="absolute top-2/3 left-1/6 right-1/6 h-0.5 bg-orange-800/60 rounded-full transform -rotate-12 opacity-70"></div>
      </div>
      
      {/* Enhanced ball highlight with multiple layers - Adjusted for smaller ball */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-white/80 to-orange-200/60 rounded-full blur-[1px]"></div>
      <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
      
      {/* Subtle shadow inside ball */}
      <div className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-orange-900/30 rounded-full blur-sm"></div>
    </div>
  );
}