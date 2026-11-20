import { NextResponse } from 'next/server';
import { dbRepo } from '@/lib/db';
import crypto from 'node:crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Strict input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 200) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const id = `msg-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

    dbRepo.createMessage({
      id,
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase(),
      subject: subject ? String(subject).trim().slice(0, 200) : undefined,
      message: message.trim().slice(0, 5000),
    });

    return NextResponse.json({
      success: true,
      messageId: id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
