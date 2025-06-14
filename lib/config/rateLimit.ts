type RateLimitEntry = {
  count: number;
  expiresAt: number;
};
const rateLimitStore = new Map<string, RateLimitEntry>();
const WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_ATTEMPTS = 3;
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);
  if (!existing || existing.expiresAt < now) {
    rateLimitStore.set(ip, {
      count: 1,
      expiresAt: now + WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }
  if (existing.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }
  existing.count++;
  rateLimitStore.set(ip, existing);
  return { allowed: true, remaining: MAX_ATTEMPTS - existing.count };
}
