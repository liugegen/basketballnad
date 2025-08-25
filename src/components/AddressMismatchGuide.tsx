'use client';

import { useState } from 'react';

interface AddressMismatchGuideProps {
  gameAddress: string;
  monadAddress: string;
}

export default function AddressMismatchGuide({ gameAddress, monadAddress }: AddressMismatchGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-300"
      >
        Cara Mengatasi Address Mismatch
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-orange-500/30 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Address Mismatch - Cara Mengatasi</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="font-semibold text-red-400 mb-2">❌ Masalah Terdeteksi</h4>
                <p className="text-xs">
                  Address wallet Anda di game berbeda dengan yang terdaftar di Monad Games ID.
                </p>
                <div className="mt-2 space-y-1 text-xs font-mono">
                  <div>Game: <span className="text-orange-400">{gameAddress}</span></div>
                  <div>Monad ID: <span className="text-green-400">{monadAddress}</span></div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">🔧 Solusi 1: Gunakan Wallet yang Benar</h4>
                <ol className="list-decimal list-inside space-y-2 text-xs">
                  <li>Disconnect wallet saat ini dari game</li>
                  <li>Import wallet dengan address: <code className="bg-gray-800 px-1 rounded text-green-400">{monadAddress}</code></li>
                  <li>Connect wallet yang benar ke game</li>
                  <li>Pastikan address match dengan Monad Games ID</li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">🔧 Solusi 2: Update Monad Games ID</h4>
                <ol className="list-decimal list-inside space-y-2 text-xs">
                  <li>
                    Buka <a 
                      href="https://monad-games-id-site.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 underline"
                    >
                      Monad Games ID
                    </a>
                  </li>
                  <li>Login dengan email yang sama</li>
                  <li>Update wallet address ke: <code className="bg-gray-800 px-1 rounded text-orange-400">{gameAddress}</code></li>
                  <li>Simpan perubahan</li>
                  <li>Kembali ke game dan coba lagi</li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">💡 Tips Penting</h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Pastikan menggunakan email yang sama di kedua platform</li>
                  <li>Simpan private key wallet dengan aman</li>
                  <li>Gunakan wallet yang sama untuk semua game Monad</li>
                  <li>Jangan lupa backup wallet sebelum import/export</li>
                </ul>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="font-semibold text-blue-400 mb-2">🎯 Rekomendasi</h4>
                <p className="text-xs">
                  Untuk kemudahan, gunakan <strong>Solusi 1</strong> - import wallet dengan address yang sudah 
                  terdaftar di Monad Games ID ({monadAddress.slice(0,6)}...{monadAddress.slice(-4)}).
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              >
                Tutup
              </button>
              <a
                href="https://monad-games-id-site.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-center"
                onClick={() => setIsOpen(false)}
              >
                Buka Monad Games ID
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}