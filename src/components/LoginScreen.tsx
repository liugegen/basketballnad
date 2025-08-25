'use client';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

export default function LoginScreen() {
  const { login } = useLogin();
  const { ready } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);

  // Handle user login process
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show simple loading spinner while Privy is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-sm relative">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
          {/* Simple Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              BasketNad
            </h1>
            <p className="text-gray-400 text-sm">Professional Basketball on Monad</p>
          </div>

          {/* Simple Connect Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              "Connect Account"
            )}
          </button>

          {/* Simple Features */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Realistic Physics</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Blockchain Integration</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Global Leaderboard</span>
            </div>
          </div>

          {/* Simple Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              BasketNad © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}