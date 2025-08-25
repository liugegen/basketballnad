'use client';

import { useState } from 'react';

interface DebugStep {
  step: number;
  action: string;
  success?: boolean;
  data?: unknown;
}

interface DebugInfo {
  playerAddress: string;
  timestamp: string;
  steps: DebugStep[];
  error?: string;
}

export default function ScoreDebugger({ playerAddress }: { playerAddress: string }) {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isDebugging, setIsDebugging] = useState(false);

  const debugScoreSubmission = async () => {
    if (!playerAddress) return;

    setIsDebugging(true);
    const debugData: DebugInfo = {
      playerAddress,
      timestamp: new Date().toISOString(),
      steps: []
    };

    try {
      // Step 1: Test session token generation
      debugData.steps.push({ step: 1, action: 'Getting session token...' });
      const sessionResponse = await fetch('/api/get-session-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerAddress,
          message: `Debug test\nAddress: ${playerAddress}\nTimestamp: ${Date.now()}`,
          signedMessage: "development_mode",
        }),
      });

      const sessionData = await sessionResponse.json();
      debugData.steps.push({ 
        step: 1, 
        action: 'Session token result', 
        success: sessionData.success,
        data: sessionData 
      });

      if (!sessionData.success) {
        setDebugInfo(debugData);
        return;
      }

      // Step 2: Test score submission
      debugData.steps.push({ step: 2, action: 'Submitting test score...' });
      const scoreResponse = await fetch('/api/update-player-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerAddress,
          scoreAmount: 999, // Test score
          transactionAmount: 1,
          sessionToken: sessionData.sessionToken,
        }),
      });

      const scoreResult = await scoreResponse.json();
      debugData.steps.push({ 
        step: 2, 
        action: 'Score submission result', 
        success: scoreResult.success,
        data: scoreResult 
      });

      // Step 3: Check player data
      debugData.steps.push({ step: 3, action: 'Checking player data...' });
      const playerDataResponse = await fetch(`/api/get-player-data?address=${encodeURIComponent(playerAddress)}`);
      const playerData = await playerDataResponse.json();
      debugData.steps.push({ 
        step: 3, 
        action: 'Player data result', 
        success: playerData.success,
        data: playerData 
      });

      // Step 4: Check game registration
      debugData.steps.push({ step: 4, action: 'Checking game registration...' });
      const registrationResponse = await fetch('/api/check-game-registration');
      const registrationData = await registrationResponse.json();
      debugData.steps.push({ 
        step: 4, 
        action: 'Game registration result', 
        success: registrationData.success,
        data: registrationData 
      });

    } catch (error) {
      debugData.error = error instanceof Error ? error.message : 'Unknown error';
    }

    setDebugInfo(debugData);
    setIsDebugging(false);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold">Score Submission Debugger</h3>
        <button
          onClick={debugScoreSubmission}
          disabled={isDebugging || !playerAddress}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm"
        >
          {isDebugging ? 'Debugging...' : 'Debug Score Submission'}
        </button>
      </div>

      {debugInfo && (
        <div className="bg-black rounded p-3 text-xs font-mono text-green-400 max-h-96 overflow-y-auto">
          <div className="text-yellow-400 mb-2">
            🔍 Debug Report - {debugInfo.timestamp}
          </div>
          
          <div className="text-blue-400 mb-2">
            Player Address: {debugInfo.playerAddress}
          </div>

          {debugInfo.steps.map((step, index) => (
            <div key={index} className="mb-2">
              <div className={`${step.success === false ? 'text-red-400' : step.success === true ? 'text-green-400' : 'text-yellow-400'}`}>
                Step {step.step}: {step.action}
              </div>
              {step.data ? (
                <div className="ml-4 text-gray-300">
                  <pre>{JSON.stringify(step.data, null, 2)}</pre>
                </div>
              ) : null}
            </div>
          ))}

          {debugInfo.error && (
            <div className="mt-4 pt-2 border-t border-red-600">
              <div className="text-red-400">Error: {debugInfo.error}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}