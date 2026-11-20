import crypto from 'node:crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'kareem-atelier-default-secret-key-32-bytes-min';

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

export function createSessionToken(userId: string): string {
  const timestamp = Date.now().toString();
  const payload = `${userId}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64url')}.${hmac}`;
}

export function verifySessionToken(token: string): { userId: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, providedHmac] = parts;
    const payload = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const expectedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(providedHmac, 'hex'), Buffer.from(expectedHmac, 'hex'))) {
      return null;
    }

    const [userId, timestampStr] = payload.split(':');
    const timestamp = parseInt(timestampStr, 10);
    // 7 days expiration
    if (Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return null;
    }

    return { userId };
  } catch {
    return null;
  }
}
