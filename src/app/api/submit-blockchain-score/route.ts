import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Smart contract ABI for the updatePlayerData function
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "scoreAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "transactionAmount",
        "type": "uint256"
      }
    ],
    "name": "updatePlayerData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract address from environment variables
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xceCBFF203C8B6044F52CE23D914A1bfD997541A4";

export async function POST(request: NextRequest) {
  try {
    const { playerAddress, scoreAmount, transactionAmount } = await request.json();

    // Validate input
    if (!playerAddress || !scoreAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: playerAddress and scoreAmount' },
        { status: 400 }
      );
    }

    // Get private key from environment variables
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    if (!privateKey) {
      console.error('WALLET_PRIVATE_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Missing wallet private key' },
        { status: 500 }
      );
    }

    // Validate contract address
    if (!CONTRACT_ADDRESS) {
      console.error('CONTRACT_ADDRESS not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Missing contract address' },
        { status: 500 }
      );
    }

    // Set up provider and wallet
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://testnet.monad.xyz';
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Check wallet balance
    const balance = await provider.getBalance(wallet.address);
    console.log('Wallet balance:', ethers.formatEther(balance), 'MON');
    
    if (balance === BigInt(0)) {
      return NextResponse.json(
        { error: 'Insufficient balance for gas fees' },
        { status: 500 }
      );
    }
    
    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    console.log('Submitting score to blockchain:', {
      playerAddress,
      scoreAmount,
      transactionAmount: transactionAmount || 0,
      contractAddress: CONTRACT_ADDRESS,
      walletAddress: wallet.address
    });

    // Estimate gas first
    try {
      const gasEstimate = await contract.updatePlayerData.estimateGas(
        playerAddress,
        scoreAmount,
        transactionAmount || 0
      );
      console.log('Gas estimate:', gasEstimate.toString());
    } catch (gasError) {
      console.error('Gas estimation failed:', gasError);
      return NextResponse.json(
        { error: 'Transaction would fail: ' + (gasError instanceof Error ? gasError.message : 'Unknown error') },
        { status: 400 }
      );
    }

    // Call the updatePlayerData function
    const tx = await contract.updatePlayerData(
      playerAddress,
      scoreAmount,
      transactionAmount || 0,
      {
        gasLimit: 300000 // Set a reasonable gas limit
      }
    );

    console.log('Transaction sent:', tx.hash);

    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.hash);

    return NextResponse.json({
      success: true,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      playerAddress,
      scoreAmount,
      transactionAmount: transactionAmount || 0
    });

  } catch (error) {
    console.error('Error submitting blockchain score:', error);
    
    let errorMessage = 'Failed to submit score to blockchain';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}