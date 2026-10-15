import "server-only";

type Bucket = { count: number; resetAt: number };

const globalStore = globalThis as typeof globalThis & {
  __clarezaRateLimits?: Map<string, Bucket>;
};

const buckets = globalStore.__clarezaRateLimits || new Map<string, Bucket>();
globalStore.__clarezaRateLimits = buckets;

function clientAddress(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimit(request: Request, scope: string, limit: number, windowMs: number) {
  const now = Date.now();
  const key = `${scope}:${clientAddress(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: Math.ceil(windowMs / 1000) };
  }

  current.count += 1;
  if (current.count <= limit) return { allowed: true, retryAfter: Math.ceil((current.resetAt - now) / 1000) };

  return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
}

export function tooManyRequests(retryAfter: number) {
  return new Response(JSON.stringify({ error: "Muitas tentativas. Aguarde alguns instantes e tente novamente." }), {
    status: 429,
    headers: { "Content-Type": "application/json", "Retry-After": String(retryAfter) },
  });
}
