# Setup Address Synchronization dengan Monad Games ID

Panduan ini menjelaskan cara memastikan address wallet Anda sinkron dengan Monad Games ID.

## Mengapa Address Harus Sinkron?

Setiap user yang mendaftar atau masuk ke proyek game harus menggunakan address wallet yang sama dengan yang terdaftar di Monad Games ID. Ini memastikan:

- Score tersimpan dengan benar
- Data konsisten antara game dan Monad Games ID
- Tracking achievement yang akurat

## Langkah-langkah Setup

### 1. Daftar di Monad Games ID

1. Buka https://monad-games-id-site.vercel.app
2. Daftar dengan email Anda
3. Connect wallet dan catat address yang digunakan
4. Simpan private key wallet dengan aman

### 2. Konfigurasi Game

1. Pastikan file `.env.local` sudah dikonfigurasi:
```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
WALLET_PRIVATE_KEY=0x... # Wallet dengan GAME_ROLE
API_SECRET=your_secret_here
CONTRACT_ADDRESS=0xceCBFF203C8B6044F52CE23D914A1bfD997541A4
GAME_ADDRESS=0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1
```

2. Deploy game ke production
3. Test dengan wallet yang sama

### 3. User Flow yang Benar

**Untuk User Baru:**
1. User daftar di Monad Games ID dengan email
2. User connect wallet di Monad Games ID
3. User buka game dan login dengan email yang sama
4. User connect wallet yang sama dengan yang di Monad Games ID
5. System verifikasi address dan mengizinkan score submission

**Untuk User Existing:**
1. User sudah punya account di Monad Games ID
2. User buka game dan login dengan email yang sama
3. User connect wallet yang sama dengan yang di Monad Games ID
4. Jika address berbeda, user harus:
   - Gunakan wallet yang benar, atau
   - Update wallet di Monad Games ID

## Implementasi Teknis

### Address Verification API

```typescript
// POST /api/verify-monad-address
{
  "email": "user@example.com",
  "walletAddress": "0x..."
}

// Response
{
  "success": true,
  "verified": true,
  "monadAddress": "0x..." // Address dari Monad Games ID
}
```

### Frontend Integration

```typescript
// Hook usage
const {
  isAddressVerified,
  verificationError,
  verifyAddressWithMonad
} = useMonadGamesId();

// Component
{!isAddressVerified && (
  <div className="error">
    Address tidak sinkron dengan Monad Games ID
    <button onClick={verifyAddressWithMonad}>
      Retry Verification
    </button>
  </div>
)}
```

## Testing

### Local Development

1. Setup environment variables
2. Run `npm run dev`
3. Test dengan wallet dummy
4. Verifikasi address verification flow

### Production Testing

1. Deploy ke staging/production
2. Test dengan real Monad Games ID account
3. Verifikasi score submission
4. Check transaction di Monad Explorer

## Common Issues

### Issue: "Address not verified"

**Penyebab:** Wallet address berbeda dengan Monad Games ID

**Solusi:**
1. Check address di Monad Games ID
2. Gunakan wallet yang sama
3. Atau daftarkan wallet baru di Monad Games ID

### Issue: "Invalid signature"

**Penyebab:** Wallet tidak bisa sign message

**Solusi:**
1. Pastikan wallet connect ke Monad Testnet
2. Refresh dan coba lagi
3. Check network configuration

### Issue: Score tidak tersimpan

**Penyebab:** Address verification gagal

**Solusi:**
1. Verifikasi address synchronization
2. Check console untuk error messages
3. Pastikan wallet punya MON tokens untuk gas

## Best Practices

1. **Konsistensi Email:** Gunakan email yang sama di semua platform
2. **Wallet Management:** Simpan private key dengan aman
3. **Testing:** Test address sync sebelum production
4. **User Education:** Berikan panduan yang jelas untuk user
5. **Error Handling:** Implementasi error handling yang baik

## Referensi

- [Mission7 Example Game](https://github.com/portdeveloper/mission7-example-game)
- [Monad Games ID Site](https://monad-games-id-site.vercel.app)
- [Monad Testnet Explorer](https://testnet.monadexplorer.com)