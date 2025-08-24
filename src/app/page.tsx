'use client';

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

// Hooks
import { useGameLogic, BALL_SIZE, HOOP_POSITION, HOOP_SIZE } from '@/hooks/useGameLogic';
import { useMouseHandlers } from '@/hooks/useMouseHandlers';
import { useTouchHandlers } from '@/hooks/useTouchHandlers';

export default function BasketNad() {
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

      {/* Game Title */}
      <GameTitle />

      {/* HUD - Game Stats */}
      {gameState === 'playing' && (
        <GameHUD score={score} timeLeft={timeLeft} />
      )}

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
    </div>
  );
}