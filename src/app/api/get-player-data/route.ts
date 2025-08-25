import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Contract ABI for reading player data from Monad Games ID
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "player", "type": "address" },
      { "internalType": "address", "name": "gameAddress", "type": "address" }
    ],
    "name": "getPlayerDataPerGame",
    "outputs": [
      { "internalType": "uint256", "name": "score", "type": "uint256" },
      { "internalType": "uint256", "name": "transactions", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Monad Games ID Contract address on Monad Testnet
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xceCBFF203C8B6044F52CE23D914A1bfD997541A4";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Player address is required' },
        { status: 400 }
      );
    }

    // Validate address format
    if (!ethers.isAddress(address)) {
      return NextResponse.json(
        { success: false, error: 'Invalid address format' },
        { status: 400 }
      );
    }

    // Setup provider for Monad Testnet
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://testnet-rpc.monad.xyz';
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // Create contract instance (read-only)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // Get game address from environment
    const gameAddress = process.env.GAME_ADDRESS || "0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1";

    // Get player data for this specific game
    const [score, transactions] = await contract.getPlayerDataPerGame(address, gameAddress);

    return NextResponse.json({
      success: true,
      playerAddress: address,
      gameAddress: gameAddress,
      score: score.toString(),
      transactions: transactions.toString(),
    });

  } catch (error: unknown) {
    console.error('Error getting player data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage || 'Failed to get player data' },
      { status: 500 }
    );
  }
}