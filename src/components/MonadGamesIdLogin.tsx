'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import Image from 'next/image';

export default function MonadGamesIdLogin() {
  const { login, authenticated, user } = usePrivy();
  const [isConnectingToMonadGamesId, setIsConnectingToMonadGamesId] = useState(false);

  const connectToMonadGamesId = async () => {
    setIsConnectingToMonadGamesId(true);
    try {
      // Login using Monad Games ID Privy App
      await login();
    } catch (error) {
      console.error('Error connecting to Monad Games ID:', error);
    } finally {
      setIsConnectingToMonadGamesId(false);
    }
  };

  if (authenticated) {
    return (
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-semibold text-green-400">Connected via Monad Games ID</span>
        </div>
        <p className="text-xs text-green-300">
          Email: {user?.email?.address}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-2">
        <Image src="/icon.png" alt="Monad Games ID" width={20} height={20} />
        <span className="text-sm font-semibold text-orange-400">Monad Games ID</span>
      </div>
      <p className="text-sm text-gray-300">
        Login dengan akun Monad Games ID Anda untuk sinkronisasi wallet dan score
      </p>
      <button
        onClick={connectToMonadGamesId}
        disabled={isConnectingToMonadGamesId}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
      >
        {isConnectingToMonadGamesId ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Connecting...</span>
          </div>
        ) : (
          'Login dengan Monad Games ID'
        )}
      </button>
      <p className="text-xs text-gray-400 text-center">
        Menggunakan email yang sama dengan akun Monad Games ID Anda
      </p>
    </div>
  );
}