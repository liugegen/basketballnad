'use client';

import { useState } from 'react';

export default function MonadSyncGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-orange-400 hover:text-orange-300 transition-colors underline"
      >
        Address tidak sinkron? Klik di sini
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-orange-500/30 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Sinkronisasi Monad Games ID</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Mengapa Address Berbeda?</h4>
                <p>
                  Address wallet Anda harus sama dengan yang terdaftar di Monad Games ID. 
                  Jika berbeda, score tidak akan tersimpan dengan benar.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Cara Mengatasi:</h4>
                <ol className="list-decimal list-inside space-y-2">
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
                  <li>Periksa address wallet yang terdaftar</li>
                  <li>Gunakan wallet yang sama di game ini</li>
                  <li>Atau daftarkan wallet baru di Monad Games ID</li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Pastikan menggunakan email yang sama</li>
                  <li>Simpan private key wallet dengan aman</li>
                  <li>Gunakan wallet yang sama untuk semua game Monad</li>
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-400 text-xs">
                  <strong>Penting:</strong> Setiap user harus memiliki address wallet yang konsisten 
                  antara Monad Games ID dan game untuk memastikan score tersimpan dengan benar.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}