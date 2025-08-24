'use client';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import GameTitle from './GameTitle';
import BackgroundEffects from './BackgroundEffects';

export default function LoginScreen() {
  const { login } = useLogin();
  const { ready } = usePrivy();

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <GameTitle className="mb-12" />
        
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Selamat Datang!
            </h2>
            <p className="text-gray-300 text-lg">
              Masuk dengan email untuk mulai bermain BasketNad
            </p>
          </div>

          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xl">Masuk dengan Email</span>
            </div>
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Dengan masuk, Anda menyetujui syarat dan ketentuan kami
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-white/60">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Powered by Monad</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Secured by Privy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}