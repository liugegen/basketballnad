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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
              BasketNad
            </h1>
            <p className="text-gray-300 text-sm">
              Professional Basketball on Monad
            </p>
          </div>

          {/* Connect Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Realistic Physics</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Competitive Gameplay</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 mb-2">
              By connecting, you agree to our{' '}
              <span className="text-orange-400 hover:text-orange-300 cursor-pointer">Terms</span>
              {' & '}
              <span className="text-orange-400 hover:text-orange-300 cursor-pointer">Privacy Policy</span>
            </p>
            <p className="text-xs text-gray-600">
              BasketNad Project © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}