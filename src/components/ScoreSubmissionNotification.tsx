'use client';

import { useEffect, useState } from 'react';

interface ScoreSubmissionNotificationProps {
  show: boolean;
  score: number;
  onClose: () => void;
}

export default function ScoreSubmissionNotification({ 
  show, 
  score, 
  onClose 
}: ScoreSubmissionNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg shadow-2xl border border-green-400/30 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🏆</span>
          </div>
          <div>
            <div className="font-bold">Score Submitted!</div>
            <div className="text-sm opacity-90">
              Score {score} saved to Monad Games ID
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors ml-2"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}