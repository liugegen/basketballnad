import { useState, useCallback } from 'react';

interface UseScoreSubmissionReturn {
  isSubmitting: boolean;
  submitError: string | null;
  submitScore: (walletAddress: string, score: number) => Promise<boolean>;
}

export function useScoreSubmission(): UseScoreSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitScore = useCallback(async (walletAddress: string, score: number): Promise<boolean> => {
    if (!walletAddress || score <= 0) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://monad-games-id-api.vercel.app/api/submit-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          score,
          gameType: 'basketball',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit score: ${response.status}`);
      }

      const result = await response.json();
      console.log('Score submitted successfully:', result);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit score';
      console.error('Error submitting score:', errorMessage);
      setSubmitError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    isSubmitting,
    submitError,
    submitScore,
  };
}