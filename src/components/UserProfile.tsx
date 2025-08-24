'use client';

import { usePrivy, useLogout } from '@privy-io/react-auth';
import { useState } from 'react';

export default function UserProfile() {
  const { user } = usePrivy();
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const userEmail = user.email?.address || 'User';
  const displayName = userEmail.split('@')[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-3 border border-purple-400/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-white font-medium text-sm">{displayName}</div>
            <div className="text-purple-200/60 text-xs">Player</div>
          </div>
          <svg 
            className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-sm rounded-xl border border-purple-500/30 shadow-2xl z-50">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-600">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-white font-medium">{displayName}</div>
                <div className="text-gray-400 text-sm">{userEmail}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-300 text-sm">Status</span>
                <span className="text-green-400 text-sm flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Keluar</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}