'use client';

import AuthComponent from '@/components/AuthComponent';
import ScoreDebugger from '@/components/ScoreDebugger';
import MobileGameControls from '@/components/MobileGameControls';

// Components
import GameTitle from '@/components/GameTitle';
import GameHUD from '@/components/GameHUD';
import BasketballCourt from '@/components/BasketballCourt';
import BasketballHoop from '@/components/BasketballHoop';
import Basketball from '@/components/Basketball';
import GameInstructions from '@/components/GameInstructions';
import AimingGuide from '@/components/AimingGuide';
import ScoreEffect from '@/components/ScoreEffect';
import TrajectoryTrail from '@/components/TrajectoryTrail';
import StartGameMenu from '@/components/StartGameMenu';
import GameOverModal from '@/components/GameOverModal';
import BackgroundEffects from '@/components/BackgroundEffects';
import ScoreSyncStatus from '@/components/ScoreSyncStatus';
import GitHubIcon from '@/components/GitHubIcon';
import BlockchainDebugger from '@/components/BlockchainDebugger';

// Hooks
import { useGameLogic, BALL_SIZE } from '@/hooks/useGameLogic';
import { useMouseHandlers } from '@/hooks/useMouseHandlers';
import { useTouchHandlers } from '@/hooks/useTouchHandlers';
import { useState } from 'react';

// Game Component - separated to avoid hooks rules issues
function GameComponent({ playerAddress }: { playerAddress: string }) {

  // Game logic hook
  const {
    score,
    timeLeft,
    gameState,
    ballPosition,
    isThrowing,
    isDragging,
    showScoreEffect,
    trajectory,
    hoopPosition,
    hoopSize,
    ballRef,
    gameAreaRef,
    startGame,
    resetGame,
    handleThrow,
    setBallPosition,
    setIsDragging,
    setDragOffset,
    dragOffset
  } = useGameLogic();

  // Mouse handlers hook
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouseHandlers({
    gameState,
    isThrowing,
    isDragging,
    ballPosition,
    dragOffset,
    ballSize: BALL_SIZE,
    gameAreaRef,
    setIsDragging,
    setDragOffset,
    setBallPosition,
    handleThrow
  });

  // Touch handlers hook
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandlers({
    gameState,
    isThrowing,
    isDragging,
    ballPosition,
    dragOffset,
    ballSize: BALL_SIZE,
    gameAreaRef,
    setIsDragging,
    setDragOffset,
    setBallPosition,
    handleThrow
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <BackgroundEffects />

      {/* Mobile Game Controls */}
      <MobileGameControls
        score={score}
        timeLeft={timeLeft}
        gameState={gameState}
        onReset={resetGame}
      />

      {/* Desktop Layout */}
      <div className="container mx-auto px-4 py-8">
        {/* Game Title - Responsive */}
        <div className="text-center mb-6 md:mb-8">
          <GameTitle />
        </div>

        {/* Game Stats - Desktop Only */}
        <div className="hidden md:flex justify-center items-start w-full max-w-6xl mx-auto mb-8 relative z-10">
          {gameState === 'playing' && (
            <GameHUD score={score} timeLeft={timeLeft} />
          )}
        </div>

        {/* Main Game Court - Responsive */}
        <div className="flex justify-center mb-20 md:mb-8">
          <BasketballCourt
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            gameAreaRef={gameAreaRef}
          >
            {/* Basketball Hoop */}
            <BasketballHoop
              position={hoopPosition}
              size={hoopSize}
              useProfessionalImage={true}
            />

            {/* Ball Trajectory Trail */}
            <TrajectoryTrail
              trajectory={trajectory}
              ballSize={BALL_SIZE}
            />

            {/* Basketball */}
            <Basketball
              position={ballPosition}
              size={BALL_SIZE}
              isDragging={isDragging}
              isThrowing={isThrowing}
              ballRef={ballRef}
            />

            {/* Game Instructions */}
            <GameInstructions
              isVisible={gameState === 'playing' && !isThrowing && !isDragging}
            />

            {/* Aiming Guide */}
            <AimingGuide isVisible={isDragging} />

            {/* Score Effect */}
            <ScoreEffect isVisible={showScoreEffect} />
          </BasketballCourt>
        </div>


      </div>

      {/* Debug: Show current game state */}
      <div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded z-50 text-sm">
        Game State: {gameState}
      </div>

      {/* Start Game Menu */}
      {gameState === 'menu' && (
        <StartGameMenu onStartGame={startGame} />
      )}

      {/* Fallback Start Button - centered for visibility */}
      {gameState === 'menu' && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={startGame}
              className="text-white font-bold py-6 px-12 rounded-2xl text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-purple-400/30 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6366f1 100%)'
              }}
            >
              🏀 START GAME 🎯
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <GameOverModal
          score={score}
          onPlayAgain={startGame}
          onMainMenu={resetGame}
        />
      )}



      {/* Score Sync Status */}
      <ScoreSyncStatus
        playerAddress={playerAddress}
        currentGameScore={score}
        gameState={gameState}
      />

      {/* Debug Components - Hidden on mobile */}
      <div className="hidden md:block">
        <ScoreDebugger playerAddress={playerAddress} />
      </div>

      {/* Blockchain Debug Component */}
      <div className="hidden md:block">
        <BlockchainDebugger />
      </div>
    </div>
  );
}

export default function BasketNad() {
  const [playerAddress, setPlayerAddress] = useState<string>("");

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 35%, #4c1d95 70%, #312e81 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Auth Component - Fixed at top */}
      <div
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: 'rgba(30, 27, 75, 0.8)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(147, 51, 234, 0.2)'
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <AuthComponent onAddressChange={setPlayerAddress} />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24">
        {playerAddress ? (
          <GameComponent playerAddress={playerAddress} />
        ) : (
          <div
            className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
            style={{ minHeight: 'calc(100vh - 96px)' }}
          >
            {/* Professional Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Gradient Orbs */}
              <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)'
                }}
              ></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-float opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%)',
                  animationDelay: '1s'
                }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-float opacity-15"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
                  animationDelay: '0.5s'
                }}
              ></div>

              {/* Floating Particles */}
              <div className="absolute top-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce-slow opacity-60 shadow-lg"></div>
              <div className="absolute top-40 right-32 w-2 h-2 bg-indigo-400 rounded-full animate-bounce-slow opacity-60 shadow-lg" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce-slow opacity-60 shadow-lg" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute bottom-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce-slow opacity-50 shadow-lg" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content Card */}
            <div className="text-center max-w-2xl mx-auto relative z-10">
              {/* Logo Section */}
              <div className="mb-12">
                <div className="relative mb-8 inline-block">
                  <div
                    className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)',
                      boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.5)'
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-3xl blur-xl opacity-40 animate-pulse"
                      style={{
                        background: 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)'
                      }}
                    ></div>
                    <span className="text-6xl relative z-10">🏀</span>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 border-2 border-purple-400 rounded-full animate-spin-slow opacity-60"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-2 border-indigo-400 rounded-full animate-spin-slow opacity-60"></div>
                </div>

                <h1
                  className="text-6xl md:text-7xl font-bold mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #ffffff 50%, #cbd5e1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  BasketNad
                </h1>
                <p className="text-2xl font-semibold mb-4" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                  Basketball on Monad Network
                </p>
                <p className="text-lg" style={{ color: 'rgba(203, 213, 225, 0.7)' }}>
                  Experience realistic physics, compete globally, and earn rewards on the blockchain
                </p>
              </div>

              {/* Main Card */}
              <div
                className="rounded-3xl p-10 relative overflow-hidden shadow-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Card Background Effects */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(99, 102, 241, 0.05) 50%, rgba(139, 92, 246, 0.1) 100%)'
                  }}
                ></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <h2
                      className="text-4xl font-bold mb-4"
                      style={{
                        background: 'linear-gradient(135deg, #e2e8f0 0%, #ffffff 50%, #cbd5e1 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Welcome to the Future of Basketball Gaming
                    </h2>
                    <div
                      className="w-32 h-1 rounded-full mx-auto mb-6"
                      style={{
                        background: 'linear-gradient(90deg, #9333ea 0%, #6366f1 100%)'
                      }}
                    ></div>
                    <p className="text-xl font-medium mb-2" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                      Connect your Monad Games ID to start playing
                    </p>
                    <p className="text-base" style={{ color: 'rgba(203, 213, 225, 0.7)' }}>
                      Join thousands of players competing on the global leaderboard
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid gap-6 mb-10">
                    {/* Blockchain Security */}
                    <div
                      className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 group cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        boxShadow: '0 4px 20px rgba(34, 197, 94, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-6">
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%)',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                          }}
                        >
                          <span className="text-3xl">🔒</span>
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-bold mb-2" style={{ color: 'rgba(226, 232, 240, 0.95)' }}>
                            Blockchain Security
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(203, 213, 225, 0.8)' }}>
                            Your scores and achievements are permanently secured on the Monad blockchain, ensuring complete transparency and immutable records.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Global Competition */}
                    <div
                      className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 group cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-6">
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                          }}
                        >
                          <span className="text-3xl">🏆</span>
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-bold mb-2" style={{ color: 'rgba(226, 232, 240, 0.95)' }}>
                            Global Competition
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(203, 213, 225, 0.8)' }}>
                            Compete with players worldwide on our real-time leaderboard. Climb the ranks and prove you&apos;re the ultimate basketball champion.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Professional Experience */}
                    <div
                      className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 group cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        border: '1px solid rgba(147, 51, 234, 0.2)',
                        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.1)'
                      }}
                    >
                      <div className="flex items-center gap-6">
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)',
                            border: '1px solid rgba(147, 51, 234, 0.3)'
                          }}
                        >
                          <span className="text-3xl">⚡</span>
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-bold mb-2" style={{ color: 'rgba(226, 232, 240, 0.95)' }}>
                            Professional Experience
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(203, 213, 225, 0.8)' }}>
                            Enjoy realistic physics, smooth gameplay, and professional-grade graphics optimized for all devices and screen sizes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center">
                    <div
                      className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-6"
                      style={{
                        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
                        border: '1px solid rgba(147, 51, 234, 0.3)'
                      }}
                    >
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="font-semibold" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                        Ready to Play
                      </span>
                    </div>

                    <p className="text-lg font-medium mb-4" style={{ color: 'rgba(226, 232, 240, 0.8)' }}>
                      🚀 Ready to dominate the court?
                    </p>
                    <p className="text-base mb-8" style={{ color: 'rgba(203, 213, 225, 0.7)' }}>
                      Click the &quot;Login with Monad Games ID&quot; button above to connect your wallet and start your basketball journey!
                    </p>

                    {/* Footer */}
                    <div className="pt-6 border-t" style={{ borderColor: 'rgba(147, 51, 234, 0.2)' }}>
                      <div className="flex items-center justify-center space-x-4 mb-3" style={{ color: 'rgba(203, 213, 225, 0.5)' }}>
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-sm font-medium">BasketNad © 2025</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.6s' }}></div>
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.8s' }}></div>
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs" style={{ color: 'rgba(147, 51, 234, 0.4)' }}>
                          Powered by BasketBallNad • Built with Excellence
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xs" style={{ color: 'rgba(147, 51, 234, 0.4)' }}>
                            Open Source on
                          </span>
                          <a
                            href="https://github.com/liugegen/basketballnad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs font-medium transition-all duration-200 hover:scale-105"
                            style={{ color: 'rgba(203, 213, 225, 0.6)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'rgba(203, 213, 225, 0.6)';
                            }}
                          >
                            <GitHubIcon className="w-4 h-4" size={16} />
                            <span>GitHub</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}