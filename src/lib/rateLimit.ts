export class RateLimiter {
    private cache: Map<string, { count: number, resetAt: number }>;
    private limit: number;
    private windowMs: number;

    constructor({ limit, windowMs }: { limit: number, windowMs: number }) {
        this.cache = new Map();
        this.limit = limit;
        this.windowMs = windowMs;
    }

    check(ip: string): { success: boolean, limit: number, remaining: number, reset: number } {
        const now = Date.now();
        const record = this.cache.get(ip);

        if (!record) {
            this.cache.set(ip, { count: 1, resetAt: now + this.windowMs });
            return { success: true, limit: this.limit, remaining: this.limit - 1, reset: now + this.windowMs };
        }

        if (now > record.resetAt) {
            record.count = 1;
            record.resetAt = now + this.windowMs;
            return { success: true, limit: this.limit, remaining: this.limit - 1, reset: record.resetAt };
        }

        if (record.count >= this.limit) {
            return { success: false, limit: this.limit, remaining: 0, reset: record.resetAt };
        }

        record.count += 1;
        return { success: true, limit: this.limit, remaining: this.limit - record.count, reset: record.resetAt };
    }
}

export const authRateLimiter = new RateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 }); // 5 requests per 15 minutes
export const publicApiRateLimiter = new RateLimiter({ limit: 60, windowMs: 60 * 1000 }); // 60 requests per minute
