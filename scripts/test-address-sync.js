#!/usr/bin/env node

/**
 * Test script untuk memverifikasi address synchronization
 * Usage: node scripts/test-address-sync.js <email> <address>
 */

const { ethers } = require('ethers');

async function testAddressSync(email, address) {
  console.log('🔍 Testing Address Synchronization...\n');
  
  // Validate inputs
  if (!email || !address) {
    console.error('❌ Error: Email and address are required');
    console.log('Usage: node scripts/test-address-sync.js <email> <address>');
    process.exit(1);
  }

  // Validate address format
  if (!ethers.isAddress(address)) {
    console.error('❌ Error: Invalid address format');
    process.exit(1);
  }

  console.log(`📧 Email: ${email}`);
  console.log(`🔗 Address: ${address}`);
  console.log(`📱 Checksum: ${ethers.getAddress(address)}\n`);

  // Test API endpoint
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/verify-monad-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        walletAddress: address,
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Address verification successful!');
      console.log(`🎯 Verified: ${data.verified}`);
      console.log(`🔗 Monad Address: ${data.monadAddress}`);
      
      if (data.monadAddress.toLowerCase() === address.toLowerCase()) {
        console.log('🎉 Perfect! Addresses match exactly.');
      } else {
        console.log('⚠️  Warning: Addresses don\'t match!');
        console.log(`   Game Address:  ${address}`);
        console.log(`   Monad Address: ${data.monadAddress}`);
      }
    } else {
      console.log('❌ Address verification failed!');
      console.log(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.log('\n💡 Make sure your development server is running:');
    console.log('   npm run dev');
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Ensure user registers at https://monad-games-id-site.vercel.app');
  console.log('2. User should use the same email and wallet address');
  console.log('3. Test the game with the verified address');
  console.log('4. Check that scores are submitted successfully');
}

// Get command line arguments
const [, , email, address] = process.argv;

testAddressSync(email, address).catch(console.error);