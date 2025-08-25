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
import MonadGamesIntegration from '@/components/MonadGamesIntegration';
import ScoreSubmissionNotification from '@/components/ScoreSubmissionNotification';

// Hooks
import { useGameLogic, BALL_SIZE, HOOP_POSITION, HOOP_SIZE } from '@/hooks/useGameLogic';
import { useMouseHandlers } from '@/hooks/useMouseHandlers';
import { useTouchHandlers } from '@/hooks/useTouchHandlers';
import { useState } from 'react';

// Game Component - separated to avoid hooks rules issues
function GameComponent({ playerAddress }: { playerAddress: string }) {
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationScore, setNotificationScore] = useState(0);
  
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
        <div className="hidden md:flex justify-between items-start w-full max-w-6xl mx-auto mb-8 relative z-10">
          {gameState === 'playing' && (
            <GameHUD score={score} timeLeft={timeLeft} />
          )}
          
          {/* Monad Games Integration */}
          <div className="ml-4">
            <MonadGamesIntegration 
              score={score} 
              gameState={gameState}
              playerAddress={playerAddress}
              onScoreSubmitted={(submittedScore) => {
                setNotificationScore(submittedScore);
                setShowNotification(true);
              }}
            />
          </div>
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
              position={HOOP_POSITION} 
              size={HOOP_SIZE}
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

        {/* Mobile Monad Games Integration */}
        <div className="md:hidden mb-6">
          <MonadGamesIntegration 
            score={score} 
            gameState={gameState}
            playerAddress={playerAddress}
            onScoreSubmitted={(submittedScore) => {
              setNotificationScore(submittedScore);
              setShowNotification(true);
            }}
          />
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

      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <GameOverModal 
          score={score}
          onPlayAgain={startGame}
          onMainMenu={resetGame}
        />
      )}

      {/* Score Submission Notification */}
      <ScoreSubmissionNotification
        show={showNotification}
        score={notificationScore}
        onClose={() => setShowNotification(false)}
      />

      {/* Debug Component - Hidden on mobile */}
      <div className="hidden md:block">
        <ScoreDebugger playerAddress={playerAddress} />
      </div>
    </div>
  );
}

export default function BasketNad() {
  const [playerAddress, setPlayerAddress] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Auth Component - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <AuthComponent onAddressChange={setPlayerAddress} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="pt-20">
        {playerAddress ? (
          <GameComponent playerAddress={playerAddress} />
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-4xl">🏀</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  BasketNad
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                  Play the best basketball game on Monad Network and achieve the highest score!
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">Welcome!</h2>
                <p className="text-gray-300 mb-6">
                  Login with Monad Games ID to start playing and compete on the global leaderboard.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Scores automatically saved on blockchain
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Real-time global leaderboard
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Smooth gameplay on all devices
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