export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main floating orbs with purple theme */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/8 rounded-full blur-3xl animate-spin-slow"></div>
      
      {/* Additional ambient effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
      
      {/* Subtle particle effects */}
      <div className="absolute top-32 left-1/3 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce-slow"></div>
      <div className="absolute top-48 right-1/3 w-1 h-1 bg-indigo-400/30 rounded-full animate-bounce-slow delay-300"></div>
      <div className="absolute bottom-40 left-1/2 w-1.5 h-1.5 bg-violet-400/30 rounded-full animate-bounce-slow delay-700"></div>
      <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-purple-300/20 rounded-full animate-bounce-slow delay-1000"></div>
    </div>
  );
}