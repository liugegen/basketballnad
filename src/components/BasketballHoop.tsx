import Image from 'next/image';

interface BasketballHoopProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
  useProfessionalImage?: boolean; // Option to use SVG image instead of CSS
}

export default function BasketballHoop({ position, size, useProfessionalImage = true }: BasketballHoopProps) {
  // Professional SVG version
  if (useProfessionalImage) {
    return (
      <div
        className="absolute z-10 transform hover:scale-105 transition-all duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      >
        <Image 
          src="/basketball-hoop-professional.svg" 
          alt="Professional Basketball Hoop"
          width={size.width}
          height={size.height}
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
          }}
          priority
        />
        
        {/* Enhanced target indicators for professional look - Adjusted for MAXIMUM size hoop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-48 h-48 border-3 border-yellow-400/40 rounded-full animate-ping opacity-60" 
               style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute w-36 h-36 border-2 border-yellow-300/60 rounded-full animate-pulse opacity-70"
               style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute w-24 h-24 border-2 border-yellow-200/80 rounded-full animate-pulse delay-500 opacity-80"
               style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-orange-400/10 blur-2xl animate-pulse-gentle"
             style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', height: '40%' }}></div>
      </div>
    );
  }

  // Original CSS version (fallback)
  return (
    <div
      className="absolute z-10 transform hover:scale-105 transition-all duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {/* Professional Backboard */}
      <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-40 h-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 border-4 border-red-600 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        {/* Backboard inner square */}
        <div className="absolute inset-6 border-4 border-red-500 rounded-lg bg-gradient-to-br from-red-50/30 to-transparent">
          {/* Target square behind hoop */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-12 h-9 border-3 border-red-400 bg-red-50/20"></div>
        </div>
        {/* Backboard reflection */}
        <div className="absolute top-3 left-3 w-10 h-6 bg-white/70 rounded-lg blur-sm"></div>
        {/* Mounting bolts */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
      
      {/* Hoop Support Arms - Professional Style */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        {/* Main support bracket */}
        <div className="w-4 h-12 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full shadow-lg"></div>
        {/* Side support arms */}
        <div className="absolute top-8 -left-8 w-16 h-2 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full transform rotate-12"></div>
        <div className="absolute top-8 -right-8 w-16 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full transform -rotate-12"></div>
      </div>
      
      {/* Professional Basketball Rim */}
      <div className="absolute inset-0 transform hover:scale-105 transition-all duration-300">
        {/* Outer rim structure */}
        <div 
          className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          style={{
            background: 'linear-gradient(145deg, #ff8c00, #ff6b00, #e55100)',
            border: '4px solid #bf360c',
          }}
        >
          {/* Inner rim with realistic depth */}
          <div 
            className="absolute inset-2 rounded-full shadow-inner"
            style={{
              background: 'linear-gradient(145deg, #ff9500, #ff7043)',
              border: '2px solid #d84315',
            }}
          >
            {/* Rim inner circle (the actual hoop opening) */}
            <div 
              className="absolute inset-3 rounded-full border-2 border-orange-800"
              style={{
                background: 'radial-gradient(circle, transparent 60%, #ff8a65 70%, #ff7043 100%)',
              }}
            ></div>
          </div>
          
          {/* Rim highlights for 3D effect */}
          <div className="absolute top-1 left-3 w-8 h-3 bg-orange-200/90 rounded-full blur-sm"></div>
          <div className="absolute bottom-1 right-3 w-6 h-2 bg-orange-900/60 rounded-full blur-sm"></div>
        </div>
        
        {/* Rim attachment points */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-3 h-2 bg-gray-600 rounded-sm"></div>
        <div className="absolute bottom-0 left-1/4 transform translate-y-1 w-2 h-2 bg-gray-600 rounded-sm"></div>
        <div className="absolute bottom-0 right-1/4 transform translate-y-1 w-2 h-2 bg-gray-600 rounded-sm"></div>
      </div>
      
      {/* Professional Basketball Net */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full">
        {/* Net structure with realistic segments */}
        <div className="relative flex justify-center">
          {/* Outer net strands - Professional basketball net */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) - 165; // Distribute evenly around the rim
            const isLong = i % 3 === 0; // Every third strand is longer
            const length = isLong ? 'h-24' : i % 2 === 0 ? 'h-20' : 'h-18';
            return (
              <div
                key={i}
                className={`absolute origin-top ${length} w-0.5 bg-gradient-to-b from-white via-gray-50 to-gray-200 rounded-full shadow-sm animate-net-sway`}
                style={{
                  '--rotation': `${angle}deg`,
                  transform: `rotate(${angle}deg) translateY(0px)`,
                  transformOrigin: 'top center',
                  left: '50%',
                  marginLeft: '-1px',
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: `${3 + (i % 3) * 0.5}s`
                } as React.CSSProperties}
              />
            );
          })}
          
          {/* Inner net strands for realistic depth */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) - 157.5;
            const length = i % 2 === 0 ? 'h-16' : 'h-14';
            return (
              <div
                key={`inner-${i}`}
                className={`absolute origin-top ${length} w-0.5 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-full shadow-sm animate-sway-delayed opacity-80`}
                style={{
                  transform: `rotate(${angle}deg) translateY(3px)`,
                  transformOrigin: 'top center',
                  left: '50%',
                  marginLeft: '-1px',
                  animationDelay: `${i * 0.12}s`,
                  animationDuration: `${3.5 + (i % 2) * 0.3}s`
                }}
              />
            );
          })}
          
          {/* Center hanging strands */}
          {[...Array(4)].map((_, i) => {
            const offsetX = (i - 1.5) * 3; // Small horizontal spread
            return (
              <div
                key={`center-${i}`}
                className="absolute origin-top h-12 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-full shadow-sm animate-sway opacity-60"
                style={{
                  transform: `translateX(${offsetX}px) translateY(4px)`,
                  left: '50%',
                  marginLeft: '-1px',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '4s'
                }}
              />
            );
          })}
          
          {/* Net connection points at the rim */}
          {[...Array(12)].map((_, i) => {
            const angle = i * 30;
            return (
              <div
                key={`connection-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full shadow-sm"
                style={{
                  transform: `rotate(${angle}deg) translateY(-2px) translateX(${size.width/2 - 8}px)`,
                  transformOrigin: 'center',
                  left: '50%',
                  top: '-2px',
                  marginLeft: '-2px'
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Professional Target Indicators */}
      <div className="absolute -inset-8 border-2 border-yellow-400/40 rounded-full animate-ping opacity-60"></div>
      <div className="absolute -inset-6 border-2 border-yellow-300/60 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute -inset-4 border-1 border-yellow-200/80 rounded-full animate-pulse delay-500 opacity-80"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-xl animate-pulse-gentle"></div>
    </div>
  );
}