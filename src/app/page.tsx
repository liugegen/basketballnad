'use client';

import { usePrivy } from '@privy-io/react-auth';
import LoginScreen from '@/components/LoginScreen';

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
import UserProfile from '@/components/UserProfile';

// Hooks
import { useGameLogic, BALL_SIZE, HOOP_POSITION, HOOP_SIZE } from '@/hooks/useGameLogic';
import { useMouseHandlers } from '@/hooks/useMouseHandlers';
import { useTouchHandlers } from '@/hooks/useTouchHandlers';
import { useState } from 'react';

export default function BasketNad() {
  const { ready, authenticated } = usePrivy();

  // Show loading while Privy is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!authenticated) {
    return <LoginScreen />;
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <BackgroundEffects />

      {/* User Profile - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <UserProfile />
      </div>

      {/* Game Title */}
      <GameTitle />

      {/* HUD - Game Stats */}
      <div className="flex justify-between items-start w-full max-w-6xl mb-8 relative z-10">
        {gameState === 'playing' && (
          <GameHUD score={score} timeLeft={timeLeft} />
        )}
        
        {/* Monad Games Integration - Always visible */}
        <div className="ml-4">
          <MonadGamesIntegration 
            score={score} 
            gameState={gameState}
            onScoreSubmitted={(submittedScore) => {
              setNotificationScore(submittedScore);
              setShowNotification(true);
            }}
          />
        </div>
      </div>

      {/* Main Game Court */}
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
          useProfessionalImage={true} // Set to false to use CSS version
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
    </div>
  );
}