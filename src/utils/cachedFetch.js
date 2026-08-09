// Tiny in-memory cache for JSON GET requests, shared across components.
// Avoids duplicate calls to rate-limited public APIs (e.g. CoinGecko) when
// multiple parts of the app request the same URL in a short window —
// including React StrictMode's dev-only double-invoked effects.
const cache = new Map();

export function cachedFetchJson(url, ttlMs = 60000) {
  const cached = cache.get(url);
  const now = Date.now();

  if (cached && now - cached.timestamp < ttlMs) {
    return cached.promise;
  }

  const promise = fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  });

  cache.set(url, { promise, timestamp: now });
  promise.catch(() => cache.delete(url));

  return promise;
}

export default cachedFetchJson;
