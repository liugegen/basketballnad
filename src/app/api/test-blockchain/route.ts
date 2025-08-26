import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function GET() {
    try {
        // Get configuration from environment variables
        const privateKey = process.env.WALLET_PRIVATE_KEY;
        const contractAddress = process.env.CONTRACT_ADDRESS || "0xceCBFF203C8B6044F52CE23D914A1bfD997541A4";
        const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://testnet.monad.xyz';

        if (!privateKey) {
            return NextResponse.json({
                success: false,
                error: 'WALLET_PRIVATE_KEY not configured'
            });
        }

        // Set up provider and wallet
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);

        // Get wallet info
        const balance = await provider.getBalance(wallet.address);
        const network = await provider.getNetwork();

        return NextResponse.json({
            success: true,
            config: {
                walletAddress: wallet.address,
                balance: ethers.formatEther(balance) + ' MON',
                contractAddress,
                rpcUrl,
                networkName: network.name,
                chainId: network.chainId.toString()
            }
        });

    } catch (error) {
        console.error('Blockchain test error:', error);

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}