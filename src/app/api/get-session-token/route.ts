import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ethers } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { playerAddress, message, signedMessage } = await request.json();

    if (!playerAddress || !message || !signedMessage) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate address format
    if (!ethers.isAddress(playerAddress)) {
      return NextResponse.json(
        { success: false, error: 'Invalid address format' },
        { status: 400 }
      );
    }

    // Verify signature if not in development mode
    if (signedMessage !== "development_mode") {
      try {
        const recoveredAddress = ethers.verifyMessage(message, signedMessage);
        if (recoveredAddress.toLowerCase() !== playerAddress.toLowerCase()) {
          return NextResponse.json(
            { success: false, error: 'Invalid signature' },
            { status: 401 }
          );
        }
      } catch (signatureError) {
        console.error('Signature verification failed:', signatureError);
        return NextResponse.json(
          { success: false, error: 'Invalid signature format' },
          { status: 401 }
        );
      }
    }

    // Generate session token
    const sessionToken = crypto
      .createHash('sha256')
      .update(`${playerAddress}-${Date.now()}-${process.env.API_SECRET}`)
      .digest('hex');

    console.log(`✅ Session token generated for address: ${playerAddress}`);

    return NextResponse.json({
      success: true,
      sessionToken,
    });
  } catch (error) {
    console.error('Error generating session token:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}