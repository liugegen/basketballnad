import { useState, useCallback } from 'react';

interface UseBlockchainScoreSubmissionReturn {
  isSubmitting: boolean;
  submitError: string | null;
  submitScore: (walletAddress: string, score: number) => Promise<boolean>;
}

export function useBlockchainScoreSubmission(): UseBlockchainScoreSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitScore = useCallback(async (walletAddress: string, score: number): Promise<boolean> => {
    if (!walletAddress || score <= 0) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Call the API endpoint that will interact with the smart contract
      const response = await fetch('/api/submit-blockchain-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerAddress: walletAddress,
          scoreAmount: score,
          transactionAmount: 0, // Set to 0 for now, adjust if needed
          gameId: 77, // Basketball game ID from the leaderboard URL
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to submit score: ${response.status}`);
      }

      const result = await response.json();
      console.log('Blockchain score submitted successfully:', result);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit score to blockchain';
      console.error('Error submitting blockchain score:', errorMessage);
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