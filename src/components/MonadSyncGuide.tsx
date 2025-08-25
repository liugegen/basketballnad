'use client';

import { useState } from 'react';

export default function MonadSyncGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-orange-400 hover:text-orange-300 transition-colors underline"
      >
        Address not synced? Click here
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-orange-500/30 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Monad Games ID Sync</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Why is the Address Different?</h4>
                <p>
                  Your wallet address must match the one registered in Monad Games ID. 
                  If different, scores will not be saved correctly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">How to Fix:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Open <a 
                      href="https://monad-games-id-site.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 underline"
                    >
                      Monad Games ID
                    </a>
                  </li>
                  <li>Login with the same email</li>
                  <li>Check the registered wallet address</li>
                  <li>Use the same wallet in this game</li>
                  <li>Or register a new wallet in Monad Games ID</li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Make sure to use the same email</li>
                  <li>Keep your wallet private key secure</li>
                  <li>Use the same wallet for all Monad games</li>
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-400 text-xs">
                  <strong>Important:</strong> Each user must have a consistent wallet address 
                  between Monad Games ID and the game to ensure scores are saved correctly.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}