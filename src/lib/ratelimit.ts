import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/env";

const redis = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN,
});

/** Sliding window: 2 requests per 60 seconds per identifier (e.g. IP) */
export const waitlistRatelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(2, "60 s"),
	prefix: "ratelimit:waitlist",
});
