import type { NextApiRequest, NextApiResponse } from "next";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  windowMs: number;
  limit: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

type UpstashResult = {
  result?: number | string | null;
  error?: string;
};

declare global {
  var __csaRateLimitStore: Map<string, RateLimitBucket> | undefined;
}

const store = global.__csaRateLimitStore ?? new Map<string, RateLimitBucket>();
if (!global.__csaRateLimitStore) {
  global.__csaRateLimitStore = store;
}

function getClientIp(req: NextApiRequest): string {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (typeof xForwardedFor === "string" && xForwardedFor.length > 0) {
    return xForwardedFor.split(",")[0].trim();
  }

  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.length > 0) {
    return realIp.trim();
  }

  return req.socket.remoteAddress ?? "unknown";
}

function compactStore(now: number): void {
  if (store.size < 500) return;

  for (const [key, bucket] of store.entries()) {
    if (bucket.resetAt <= now) {
      store.delete(key);
    }
  }
}

function getUpstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;
  return { url, token };
}

async function upstashCommand(
  config: { url: string; token: string },
  command: Array<string | number>
): Promise<UpstashResult> {
  const response = await fetch(`${config.url}/${command.join("/")}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Upstash rate limit error: ${response.status}`);
  }

  return (await response.json()) as UpstashResult;
}

async function checkRateLimitDistributed(
  req: NextApiRequest,
  keySuffix: string,
  options: RateLimitOptions
): Promise<RateLimitResult | null> {
  const config = getUpstashConfig();
  if (!config) return null;

  const now = Date.now();
  const ip = getClientIp(req);
  const windowId = Math.floor(now / options.windowMs);
  const resetAt = (windowId + 1) * options.windowMs;
  const key = `rl:${keySuffix}:${ip}:${windowId}`;

  try {
    const incr = await upstashCommand(config, ["incr", key]);
    const count = Number(incr.result);
    if (!Number.isFinite(count)) {
      throw new Error("Invalid INCR result from Upstash");
    }

    // Apply TTL only on first hit of this window bucket.
    if (count === 1) {
      const ttlSeconds = Math.max(Math.ceil(options.windowMs / 1000), 1);
      await upstashCommand(config, ["expire", key, ttlSeconds]);
    }

    const remaining = Math.max(options.limit - count, 0);
    return {
      allowed: count <= options.limit,
      remaining,
      resetAt,
    };
  } catch {
    // On remote limiter failure, fallback to in-memory limiter.
    return null;
  }
}

function checkRateLimitInMemory(
  req: NextApiRequest,
  keySuffix: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  compactStore(now);

  const ip = getClientIp(req);
  const key = `${ip}:${keySuffix}`;

  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    const resetAt = now + options.windowMs;
    store.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: Math.max(options.limit - 1, 0),
      resetAt,
    };
  }

  current.count += 1;

  const remaining = Math.max(options.limit - current.count, 0);
  return {
    allowed: current.count <= options.limit,
    remaining,
    resetAt: current.resetAt,
  };
}

export async function checkRateLimit(
  req: NextApiRequest,
  keySuffix: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const distributed = await checkRateLimitDistributed(req, keySuffix, options);
  if (distributed) return distributed;

  return checkRateLimitInMemory(req, keySuffix, options);
}

export function setRateLimitHeaders(
  res: NextApiResponse,
  result: RateLimitResult,
  options: RateLimitOptions
): void {
  const retryAfterSeconds = Math.max(
    Math.ceil((result.resetAt - Date.now()) / 1000),
    0
  );

  res.setHeader("X-RateLimit-Limit", String(options.limit));
  res.setHeader("X-RateLimit-Remaining", String(result.remaining));
  res.setHeader("X-RateLimit-Reset", String(Math.floor(result.resetAt / 1000)));

  if (!result.allowed) {
    res.setHeader("Retry-After", String(retryAfterSeconds));
  }
}
