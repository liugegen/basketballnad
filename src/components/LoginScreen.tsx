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
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Dynamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            BasketNad
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Experience realistic basketball physics and professional gameplay on the Monad blockchain
          </p>

          {/* Status Indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Powered by Monad</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Secured by Privy</span>
            </div>
          </div>
        </div>

        {/* Game Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl w-full">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Realistic Physics</h3>
            <p className="text-gray-400 text-sm">Professional basketball simulation with accurate ball dynamics</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Blockchain Security</h3>
            <p className="text-gray-400 text-sm">Secure gameplay powered by Monad blockchain technology</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Challenging Gameplay</h3>
            <p className="text-gray-400 text-sm">Test your skills with progressively difficult challenges</p>
          </div>
        </div>
      </div>

      {/* Bottom Connect Button */}
      <div className="relative z-10 p-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="group relative w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button Content */}
            <div className="relative flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
                  <span className="text-lg">Connecting...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-lg">Connect Account</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </div>
          </button>

          {/* Terms and Info */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-xs text-gray-500">
              By connecting, you agree to our{' '}
              <span className="text-orange-400 hover:text-orange-300 cursor-pointer transition-colors">
                Terms & Conditions
              </span>{' '}
              and{' '}
              <span className="text-orange-400 hover:text-orange-300 cursor-pointer transition-colors">
                Privacy Policy
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              🏀 Mission 7 Monad Game Jam 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}