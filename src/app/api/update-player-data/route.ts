import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Contract ABI for Monad Games ID contract
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "player", "type": "address" },
      { "internalType": "address", "name": "gameAddress", "type": "address" },
      { "internalType": "uint256", "name": "scoreAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "transactionAmount", "type": "uint256" }
    ],
    "name": "updatePlayerData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Monad Games ID Contract address on Monad Testnet
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xceCBFF203C8B6044F52CE23D914A1bfD997541A4";

export async function POST(request: NextRequest) {
  try {
    const { playerAddress, scoreAmount, transactionAmount, sessionToken } = await request.json();

    if (!playerAddress || !scoreAmount || !transactionAmount || !sessionToken) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate session token (basic validation)
    if (!sessionToken || sessionToken.length < 32) {
      return NextResponse.json(
        { success: false, error: 'Invalid session token' },
        { status: 401 }
      );
    }

    // Get private key from environment
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    if (!privateKey) {
      console.error('WALLET_PRIVATE_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Setup provider and wallet for Monad Testnet
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://testnet-rpc.monad.xyz';
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    // Get game address from environment
    const gameAddress = process.env.GAME_ADDRESS || "0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1";

    // Call updatePlayerData function with game address
    const tx = await contract.updatePlayerData(
      playerAddress,
      gameAddress,
      ethers.parseUnits(scoreAmount.toString(), 0), // Score as integer
      ethers.parseUnits(transactionAmount.toString(), 0) // Transaction count as integer
    );

    // Wait for transaction confirmation
    const receipt = await tx.wait();

    return NextResponse.json({
      success: true,
      transactionHash: receipt.hash,
      message: 'Score updated successfully',
    });

  } catch (error: unknown) {
    console.error('Error updating player data:', error);

    // Handle specific blockchain errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('Another transaction has higher priority')) {
      return NextResponse.json(
        { success: false, error: 'Another transaction has higher priority. Please try again.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: errorMessage || 'Failed to update player data' },
      { status: 500 }
    );
  }
}