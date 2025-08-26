import { useState, useEffect, useRef, useCallback } from 'react';

// Game state type definitions
export type GameState = 'menu' | 'playing' | 'gameOver';
export type BallPosition = { x: number; y: number };

// Game constants - Responsive values
export const BALL_SIZE = 30; // Smaller ball for better proportion with larger hoop

// Responsive hoop configuration
export const getResponsiveHoopConfig = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (isMobile) {
    return {
      HOOP_POSITION: { x: 150, y: 30 }, // Centered for mobile
      HOOP_SIZE: { width: 200, height: 40 }, // Smaller for mobile
      INITIAL_BALL_POSITION: { x: 40, y: 200 }
    };
  }
  
  return {
    HOOP_POSITION: { x: 400, y: 50 }, // Desktop position
    HOOP_SIZE: { width: 400, height: 80 }, // Desktop size
    INITIAL_BALL_POSITION: { x: 80, y: 320 }
  };
};

// Default values for server-side rendering
export const HOOP_POSITION = { x: 400, y: 50 };
export const HOOP_SIZE = { width: 400, height: 80 };
export const INITIAL_BALL_POSITION = { x: 80, y: 320 };

interface UseGameLogicProps {
  onGameEnd?: (finalScore: number) => void;
}

export function useGameLogic(props?: UseGameLogicProps) {
  // Get responsive configuration
  const [hoopConfig, setHoopConfig] = useState(() => getResponsiveHoopConfig());
  
  // Game State Management
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<GameState>('menu');

  // Ball physics and interaction states
  const [ballPosition, setBallPosition] = useState<BallPosition>(hoopConfig.INITIAL_BALL_POSITION);
  
  // Update hoop config on window resize
  useEffect(() => {
    const handleResize = () => {
      setHoopConfig(getResponsiveHoopConfig());
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
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
            // Call onGameEnd callback with final score
            if (props?.onGameEnd) {
              props.onGameEnd(score);
            }
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

    // Hoop collision area - responsive and forgiving
    const hoopLeft = hoopConfig.HOOP_POSITION.x + (hoopConfig.HOOP_SIZE.width * 0.1);
    const hoopRight = hoopConfig.HOOP_POSITION.x + hoopConfig.HOOP_SIZE.width - (hoopConfig.HOOP_SIZE.width * 0.1);
    const hoopTop = hoopConfig.HOOP_POSITION.y + (hoopConfig.HOOP_SIZE.height * 0.4);
    const hoopBottom = hoopConfig.HOOP_POSITION.y + hoopConfig.HOOP_SIZE.height + (hoopConfig.HOOP_SIZE.height * 0.6);
    
    return ballCenterX >= hoopLeft && 
           ballCenterX <= hoopRight && 
           ballCenterY >= hoopTop && 
           ballCenterY <= hoopBottom;
  }, [hoopConfig]);

  // Ball Throwing Mechanic with improved physics
  const handleThrow = useCallback(() => {
    if (isThrowing || gameState !== 'playing') return;

    setIsThrowing(true);
    const startPos = { ...ballPosition };
    
    // Calculate direction towards hoop center
    const hoopCenterX = hoopConfig.HOOP_POSITION.x + hoopConfig.HOOP_SIZE.width / 2;
    const hoopCenterY = hoopConfig.HOOP_POSITION.y + hoopConfig.HOOP_SIZE.height / 2;
    
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
          setBallPosition(hoopConfig.INITIAL_BALL_POSITION);
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
          setBallPosition(hoopConfig.INITIAL_BALL_POSITION);
          setIsThrowing(false);
          setTrajectory([]);
        }, 500);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [
    ballPosition, 
    isThrowing, 
    gameState, 
    checkCollision, 
    hoopConfig.HOOP_POSITION.x, 
    hoopConfig.HOOP_POSITION.y, 
    hoopConfig.HOOP_SIZE.height, 
    hoopConfig.HOOP_SIZE.width, 
    hoopConfig.INITIAL_BALL_POSITION
  ]);

  // Game Flow Control
  const startGame = () => {
    console.log('Starting game...');
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setBallPosition(hoopConfig.INITIAL_BALL_POSITION);
    setIsThrowing(false);
    setIsDragging(false);
    setShowScoreEffect(false);
    setTrajectory([]);
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setTimeLeft(60);
    setBallPosition(hoopConfig.INITIAL_BALL_POSITION);
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
    
    // Responsive configuration
    hoopPosition: hoopConfig.HOOP_POSITION,
    hoopSize: hoopConfig.HOOP_SIZE,
    
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