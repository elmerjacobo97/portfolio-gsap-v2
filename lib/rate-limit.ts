import 'server-only'

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_HITS = 5

/**
 * In-memory sliding window.
 *
 * HONEST LIMITATION: on serverless this Map lives per instance, so a
 * determined sender hitting different instances gets more than MAX_HITS. It is
 * a speed bump, not a wall — the honeypot and time trap carry the real load.
 * If this ever needs to be a wall, swap in @upstash/ratelimit; do not add that
 * dependency (and its external service) for a portfolio contact form.
 */
const hits = new Map<string, number[]>()

export function rateLimit(key: string): { ok: boolean } {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_HITS) {
    hits.set(key, recent)
    return { ok: false }
  }

  recent.push(now)
  hits.set(key, recent)

  // Opportunistic cleanup so the Map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }

  return { ok: true }
}
