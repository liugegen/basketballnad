import { useState, useEffect, useRef, useCallback } from 'react';

// Game state type definitions
export type GameState = 'menu' | 'playing' | 'gameOver';
export type BallPosition = { x: number; y: number };

// Game constants
export const BALL_SIZE = 30; // Smaller ball for better proportion with larger hoop
export const HOOP_POSITION = { x: 400, y: 50 }; // Adjusted position for MAXIMUM size hoop
export const HOOP_SIZE = { width: 400, height: 80 }; // MAXIMUM size for very realistic proportion
export const INITIAL_BALL_POSITION = { x: 80, y: 320 };

export function useGameLogic() {
  // Game State Management
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<GameState>('menu');

  // Ball physics and interaction states
  const [ballPosition, setBallPosition] = useState<BallPosition>(INITIAL_BALL_POSITION);
  const [isThrowing, setIsThrowing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<BallPosition>({ x: 0, y: 0 });
  const [showScoreEffect, setShowScoreEffect] = useState(false);
  const [trajectory, setTrajectory] = useState<BallPosition[]>([]);

  // Refs for DOM elements and animation
  const ballRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Game Loop & Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, timeLeft]);

  // Collision Detection & Scoring
  const checkCollision = useCallback((ballPos: BallPosition): boolean => {
    const ballCenterX = ballPos.x + BALL_SIZE / 2;
    const ballCenterY = ballPos.y + BALL_SIZE / 2;

    // Hoop collision area - MAXIMUM forgiving with MAXIMUM size hoop
    const hoopLeft = HOOP_POSITION.x + 40;
    const hoopRight = HOOP_POSITION.x + HOOP_SIZE.width - 40;
    const hoopTop = HOOP_POSITION.y + 30;
    const hoopBottom = HOOP_POSITION.y + HOOP_SIZE.height + 50;
    
    return ballCenterX >= hoopLeft && 
           ballCenterX <= hoopRight && 
           ballCenterY >= hoopTop && 
           ballCenterY <= hoopBottom;
  }, []);

  // Ball Throwing Mechanic with improved physics
  const handleThrow = useCallback(() => {
    if (isThrowing || gameState !== 'playing') return;

    setIsThrowing(true);
    const startPos = { ...ballPosition };
    
    // Calculate direction towards hoop center
    const hoopCenterX = HOOP_POSITION.x + HOOP_SIZE.width / 2;
    const hoopCenterY = HOOP_POSITION.y + HOOP_SIZE.height / 2;
    
    const deltaX = hoopCenterX - startPos.x;
    const deltaY = hoopCenterY - startPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = Math.max(800, Math.min(1500, distance * 1.5));

    let startTime: number;
    const trajectoryPoints: BallPosition[] = [];

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Enhanced parabolic arc
      const x = startPos.x + deltaX * progress;
      const arcHeight = Math.max(80, distance * 0.3);
      const y = startPos.y + deltaY * progress - arcHeight * Math.sin(Math.PI * progress);

      const newPosition = { x, y };
      setBallPosition(newPosition);
      trajectoryPoints.push({ ...newPosition });
      setTrajectory([...trajectoryPoints]);

      // Check for scoring
      if (progress > 0.3 && checkCollision(newPosition)) {
        setScore(prev => prev + 1);
        setShowScoreEffect(true);
        
        setTimeout(() => {
          setBallPosition(INITIAL_BALL_POSITION);
          setIsThrowing(false);
          setShowScoreEffect(false);
          setTrajectory([]);
        }, 1000);
        return;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete, reset ball
        setTimeout(() => {
          setBallPosition(INITIAL_BALL_POSITION);
          setIsThrowing(false);
          setTrajectory([]);
        }, 500);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [ballPosition, isThrowing, gameState, checkCollision]);

  // Game Flow Control
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setBallPosition(INITIAL_BALL_POSITION);
    setIsThrowing(false);
    setIsDragging(false);
    setShowScoreEffect(false);
    setTrajectory([]);
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setTimeLeft(60);
    setBallPosition(INITIAL_BALL_POSITION);
    setIsThrowing(false);
    setIsDragging(false);
    setShowScoreEffect(false);
    setTrajectory([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return {
    // State
    score,
    timeLeft,
    gameState,
    ballPosition,
    isThrowing,
    isDragging,
    showScoreEffect,
    trajectory,
    
    // Refs
    ballRef,
    gameAreaRef,
    
    // Actions
    startGame,
    resetGame,
    handleThrow,
    
    // Setters for mouse/touch handlers
    setBallPosition,
    setIsDragging,
    setDragOffset,
    dragOffset
  };
}