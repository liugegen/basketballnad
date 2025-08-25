import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { playerAddress, message, signedMessage } = await request.json();

    if (!playerAddress || !message || !signedMessage) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real implementation, you would verify the signature here
    // For now, we'll generate a simple session token
    const sessionToken = crypto
      .createHash('sha256')
      .update(`${playerAddress}-${Date.now()}-${process.env.API_SECRET}`)
      .digest('hex');

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