import { useCallback } from 'react';
import { BallPosition } from './useGameLogic';

interface UseMouseHandlersProps {
  gameState: string;
  isThrowing: boolean;
  isDragging: boolean;
  ballPosition: BallPosition;
  dragOffset: BallPosition;
  ballSize: number;
  gameAreaRef: React.RefObject<HTMLDivElement | null>;
  setIsDragging: (dragging: boolean) => void;
  setDragOffset: (offset: BallPosition) => void;
  setBallPosition: (position: BallPosition) => void;
  handleThrow: () => void;
}

export function useMouseHandlers({
  gameState,
  isThrowing,
  isDragging,
  ballPosition,
  dragOffset,
  ballSize,
  gameAreaRef,
  setIsDragging,
  setDragOffset,
  setBallPosition,
  handleThrow
}: UseMouseHandlersProps) {
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (gameState !== 'playing' || isThrowing) return;

    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if clicking on the ball
    const ballRect = {
      left: ballPosition.x,
      right: ballPosition.x + ballSize,
      top: ballPosition.y,
      bottom: ballPosition.y + ballSize
    };

    if (mouseX >= ballRect.left && mouseX <= ballRect.right && 
        mouseY >= ballRect.top && mouseY <= ballRect.bottom) {
      setIsDragging(true);
      setDragOffset({
        x: mouseX - ballPosition.x,
        y: mouseY - ballPosition.y
      });
    }
  }, [gameState, isThrowing, ballPosition, ballSize, gameAreaRef, setIsDragging, setDragOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || gameState !== 'playing' || isThrowing) return;

    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = Math.max(0, Math.min(mouseX - dragOffset.x, rect.width - ballSize));
    const newY = Math.max(0, Math.min(mouseY - dragOffset.y, rect.height - ballSize));

    setBallPosition({ x: newX, y: newY });
  }, [isDragging, gameState, isThrowing, dragOffset, ballSize, gameAreaRef, setBallPosition]);

  const handleMouseUp = useCallback(() => {
    if (isDragging && gameState === 'playing') {
      setIsDragging(false);
      handleThrow();
    }
  }, [isDragging, gameState, setIsDragging, handleThrow]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
}