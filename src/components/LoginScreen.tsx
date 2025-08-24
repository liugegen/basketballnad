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

  // Show enhanced loading spinner while Privy is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-red-950 flex items-center justify-center">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-orange-500/20"></div>

          {/* Main spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500/30 border-t-orange-500 shadow-lg shadow-orange-500/30"></div>

          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>

          {/* Loading text */}
          <div className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2 text-orange-300/80 text-sm font-medium whitespace-nowrap">
            Initializing BasketNad...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-red-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-orange-600/8 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-orange-300/60 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-slate-900/60 via-orange-900/30 to-red-900/40 backdrop-blur-2xl rounded-3xl p-10 border border-orange-500/30 shadow-2xl shadow-orange-900/30 hover:shadow-orange-500/20 transition-all duration-500">
          {/* Modern Basketball Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>

              {/* Main icon container */}
              <div className="relative w-full h-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 border-2 border-orange-400/30 group-hover:scale-110 transition-transform duration-300">
                {/* Basketball SVG Icon */}
                <svg className="w-10 h-10 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z" />
                  <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
                </svg>

                {/* Basketball lines overlay */}
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 transform -translate-y-1/2"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 transform -translate-x-1/2"></div>
                  <div className="absolute inset-2 rounded-full border border-white/10"></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-2 tracking-tight">
                BasketNad
              </h1>
              <p className="text-orange-200/90 text-base font-medium">Professional Basketball on Monad</p>
              <div className="flex items-center justify-center space-x-2 mt-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>

          {/* Modern Connect Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-500 hover:via-red-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {isLoading ? (
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                <span className="text-lg">Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-lg font-semibold">Connect Wallet</span>
              </div>
            )}
          </button>

          {/* Enhanced Features */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-4 text-orange-100/90 text-base group hover:text-orange-50 transition-colors duration-200">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="font-medium">Realistic Physics Engine</span>
            </div>
            <div className="flex items-center space-x-4 text-orange-100/90 text-base group hover:text-orange-50 transition-colors duration-200">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse delay-200 shadow-lg shadow-blue-400/50"></div>
              <span className="font-medium">Monad Blockchain Integration</span>
            </div>
            <div className="flex items-center space-x-4 text-orange-100/90 text-base group hover:text-orange-50 transition-colors duration-200">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse delay-400 shadow-lg shadow-orange-400/50"></div>
              <span className="font-medium">Global Leaderboard</span>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-1 h-1 bg-orange-400/60 rounded-full"></div>
              <div className="w-1 h-1 bg-red-400/60 rounded-full"></div>
              <div className="w-1 h-1 bg-orange-400/60 rounded-full"></div>
            </div>
            <p className="text-sm text-orange-300/70 font-medium">
              BasketNad © 2025
            </p>
            <p className="text-xs text-orange-400/50 mt-1">
              Powered by Monad Network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}