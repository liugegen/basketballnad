interface GameTitleProps {
  className?: string;
}

import Image from 'next/image';

export default function GameTitle({ className = "" }: GameTitleProps) {
  return (
    <div className={`text-center mb-8 relative z-10 ${className}`}>
      <div className="relative flex items-center justify-center mb-4">
        <Image 
          src="/icon.png" 
          alt="BasketNad Logo" 
          width={80}
          height={80}
          className="mr-4 drop-shadow-2xl animate-bounce"
        />
        <div className="relative">
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mb-3 drop-shadow-2xl animate-gradient-x">
            BasketNad
          </h1>
          <div className="absolute inset-0 text-7xl font-black text-orange-500/20 blur-sm animate-pulse">
            BasketNad
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 text-white/70">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
        <p className="text-xl font-medium tracking-wider">Mission 7 Monad Game Jam</p>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}