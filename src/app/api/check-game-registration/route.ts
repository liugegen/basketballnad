import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Contract ABI for checking game registration
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "games",
    "outputs": [
      { "internalType": "address", "name": "game", "type": "address" },
      { "internalType": "string", "name": "image", "type": "string" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "url", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "role", "type": "bytes32" },
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "hasRole",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "GAME_ROLE",
    "outputs": [
      { "internalType": "bytes32", "name": "", "type": "bytes32" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xceCBFF203C8B6044F52CE23D914A1bfD997541A4";

export async function GET() {
  try {
    const gameAddress = process.env.GAME_ADDRESS || "0x103Da691d9323c3Fd51f124FD4B3Dd13338788A1";
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    
    if (!privateKey) {
      return NextResponse.json(
        { success: false, error: 'WALLET_PRIVATE_KEY not configured' },
        { status: 500 }
      );
    }

    // Setup provider for Monad Testnet
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://testnet-rpc.monad.xyz';
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey);
    const walletAddress = wallet.address;

    // Create contract instance (read-only)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // Check if game is registered
    let gameInfo;
    try {
      gameInfo = await contract.games(gameAddress);
    } catch (error) {
      console.error('Error checking game registration:', error);
      gameInfo = [ethers.ZeroAddress, "", "Unknown", ""];
    }

    // Check if wallet has GAME_ROLE
    const GAME_ROLE = await contract.GAME_ROLE();
    let hasGameRole = false;
    try {
      hasGameRole = await contract.hasRole(GAME_ROLE, walletAddress);
    } catch (error) {
      console.error('Error checking GAME_ROLE:', error);
    }

    return NextResponse.json({
      success: true,
      gameAddress,
      contractAddress: CONTRACT_ADDRESS,
      walletAddress,
      gameRegistration: {
        isRegistered: gameInfo[0] !== ethers.ZeroAddress,
        name: gameInfo[2], // name is at index 2 in the new ABI
        image: gameInfo[1], // image is at index 1
        url: gameInfo[3], // url is at index 3
        gameAddress: gameInfo[0]
      },
      permissions: {
        hasGameRole
      },
      rpcUrl
    });

  } catch (error: unknown) {
    console.error('Error checking game registration:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}