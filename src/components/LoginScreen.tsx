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

  // Show loading spinner while Privy is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500/30 border-t-orange-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-orange-500/20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl shadow-purple-900/20">
          {/* Basketball Icon */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-2xl">🏀</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-2">
              BasketNad
            </h1>
            <p className="text-purple-300/80 text-sm">Professional Basketball on Monad</p>
          </div>

          {/* Connect Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>Connect Account</span>
              </div>
            )}
          </button>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 text-purple-200/80 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Realistic Physics Engine</span>
            </div>
            <div className="flex items-center space-x-3 text-purple-200/80 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              <span>Blockchain Integration</span>
            </div>
            <div className="flex items-center space-x-3 text-purple-200/80 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
              <span>Competitive Leaderboard</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-purple-400/60">
              BasketNad © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}