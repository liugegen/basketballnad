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

  // Show elegant loading screen while Privy is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/20 border-t-purple-400 mx-auto"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-purple-400/30 mx-auto"></div>
          </div>
          <p className="text-purple-200 text-lg font-medium">Loading BasketNad...</p>
          <p className="text-purple-300/70 text-sm mt-2">Preparing the best experience for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-float delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400/40 rounded-full animate-bounce-slow delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-violet-400/40 rounded-full animate-bounce-slow delay-700"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300/30 rounded-full animate-bounce-slow delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main login card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5 rounded-3xl"></div>

          {/* Header with logo */}
          <div className="text-center mb-10 relative">
            {/* Logo container */}
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <span className="text-3xl">🏀</span>
              </div>
              {/* Logo glow */}
              <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 via-white to-indigo-200 bg-clip-text text-transparent mb-3">
              BasketNad
            </h1>
            <p className="text-purple-200/80 text-base font-medium">Professional Basketball on Monad</p>
            <p className="text-purple-300/60 text-sm mt-2">Experience unforgettable gameplay</p>
          </div>

          {/* Connect button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:via-purple-400 hover:to-indigo-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

            <div className="relative flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span className="text-lg">Connecting...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🎮</span>
                  <span className="text-lg">Login with Monad Games ID</span>
                </>
              )}
            </div>
          </button>

          {/* Features section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-4 text-purple-100 group hover:text-white transition-colors duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 transition-colors duration-200">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-medium">Realistic Physics</span>
                <p className="text-xs text-purple-300/70">Accurate basketball simulation</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-purple-100 group hover:text-white transition-colors duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-200">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              </div>
              <div>
                <span className="font-medium">Blockchain Integration</span>
                <p className="text-xs text-purple-300/70">Scores safely stored on blockchain</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-purple-100 group hover:text-white transition-colors duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors duration-200">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-400"></div>
              </div>
              <div>
                <span className="font-medium">Global Leaderboard</span>
                <p className="text-xs text-purple-300/70">Compete with players worldwide</p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center space-x-2 text-purple-300/60">
              <div className="w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">BasketNad © 2025</span>
              <div className="w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-500"></div>
            </div>
            <p className="text-center text-xs text-purple-400/50 mt-2">
              Powered by Monad Network
            </p>
          </div>
        </div>

        {/* Additional decorative elements around the card */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-purple-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-indigo-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 -left-6 w-4 h-4 bg-purple-400/10 rounded-full animate-bounce-subtle"></div>
        <div className="absolute top-1/4 -right-6 w-3 h-3 bg-indigo-400/10 rounded-full animate-bounce-subtle delay-300"></div>
      </div>
    </div>
  );
}