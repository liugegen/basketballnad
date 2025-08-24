import { useCallback } from 'react';
import { BallPosition } from './useGameLogic';

interface UseTouchHandlersProps {
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

export function useTouchHandlers({
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
}: UseTouchHandlersProps) {

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    const ballRect = {
      left: ballPosition.x,
      right: ballPosition.x + ballSize,
      top: ballPosition.y,
      bottom: ballPosition.y + ballSize
    };

    if (touchX >= ballRect.left && touchX <= ballRect.right && 
        touchY >= ballRect.top && touchY <= ballRect.bottom) {
      setIsDragging(true);
      setDragOffset({
        x: touchX - ballPosition.x,
        y: touchY - ballPosition.y
      });
    }
  }, [ballPosition, ballSize, gameAreaRef, setIsDragging, setDragOffset]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || gameState !== 'playing' || isThrowing) return;
    e.preventDefault();

    const touch = e.touches[0];
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    const newX = Math.max(0, Math.min(touchX - dragOffset.x, rect.width - ballSize));
    const newY = Math.max(0, Math.min(touchY - dragOffset.y, rect.height - ballSize));

    setBallPosition({ x: newX, y: newY });
  }, [isDragging, gameState, isThrowing, dragOffset, ballSize, gameAreaRef, setBallPosition]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging && gameState === 'playing') {
      setIsDragging(false);
      handleThrow();
    }
  }, [isDragging, gameState, setIsDragging, handleThrow]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}