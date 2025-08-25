import { NextRequest, NextResponse } from 'next/server';
import { MONAD_GAMES_ID_CONFIG, isAddressMatch } from '@/config/monad-games-id';

export async function POST(request: NextRequest) {
    try {
        const { email, walletAddress } = await request.json();

        if (!email || !walletAddress) {
            return NextResponse.json(
                { success: false, error: 'Email and wallet address are required' },
                { status: 400 }
            );
        }

        // In a real implementation, this would call Monad Games ID API to verify
        // that the email is associated with the provided wallet address
        // For now, we'll simulate this verification

        // TODO: Replace with actual Monad Games ID API call
        // const monadResponse = await fetch('https://monad-games-id-api.com/verify-user', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${process.env.MONAD_API_KEY}`
        //   },
        //   body: JSON.stringify({ email, walletAddress })
        // });

        // For development, we'll simulate the Monad Games ID response
        // In production, you need to implement the actual Monad Games ID API integration

        console.log(`Verifying address ${walletAddress} for email ${email} with Monad Games ID`);

        // Simulate Monad Games ID returning the correct address for the user
        // This should be replaced with actual API call to Monad Games ID
        const monadGameIdAddress = MONAD_GAMES_ID_CONFIG.TEST_ADDRESSES.MONAD_GAMES_ID_USER;
        
        const isVerified = isAddressMatch(walletAddress, monadGameIdAddress);
        
        return NextResponse.json({
            success: true,
            verified: isVerified,
            message: isVerified ? 'Address verified with Monad Games ID' : 'Address does not match Monad Games ID account',
            monadAddress: monadGameIdAddress,
            gameAddress: walletAddress
        });

    } catch (error) {
        console.error('Error verifying Monad address:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to verify address with Monad Games ID' },
            { status: 500 }
        );
    }
}