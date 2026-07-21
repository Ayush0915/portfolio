import { NextRequest } from "next/server";

interface RateLimitConfig {
  prefix: string;
  windowMs: number;
  maxRequests: number;
}

interface RequestLog {
  timestamps: number[];
}

const store = new Map<string, RequestLog>();

// Periodic cleanup of expired records every 5 minutes
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, log] of store.entries()) {
      log.timestamps = log.timestamps.filter((ts) => now - ts < 600_000);
      if (log.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, 300_000);
  if (timer.unref) {
    timer.unref();
  }
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): { allowed: boolean; remaining: number } {
  const ip = getClientIp(request);
  const key = `${config.prefix}:${ip}`;
  const now = Date.now();

  let log = store.get(key);
  if (!log) {
    log = { timestamps: [] };
    store.set(key, log);
  }

  log.timestamps = log.timestamps.filter((ts) => now - ts < config.windowMs);

  if (log.timestamps.length >= config.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  log.timestamps.push(now);
  return { allowed: true, remaining: config.maxRequests - log.timestamps.length };
}
