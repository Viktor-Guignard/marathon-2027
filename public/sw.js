const CACHE_NAME = 'stride-app-v1';
const APP_ROUTES = ['', 'plan/', 'training/', 'long-runs/', 'analysis/', 'goals/'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const pages = await Promise.all(APP_ROUTES.map(async (route) => {
      try {
        const url = new URL(route, self.registration.scope);
        const response = await fetch(url, { cache: 'reload' });
        if (!response.ok) return '';
        await cache.put(url, response.clone());
        return await response.text();
      } catch { return ''; }
    }));
    const assets = new Set();
    for (const html of pages) {
      for (const match of html.matchAll(/(?:src|href)=\"([^\"]*\/_next\/static\/[^\"]+)\"/g)) {
        try {
          const url = new URL(match[1], self.registration.scope);
          if (url.origin === self.location.origin) assets.add(url.href);
        } catch {}
      }
    }
    await Promise.all([...assets].map(async (asset) => {
      try {
        const response = await fetch(asset, { cache: 'reload' });
        if (response.ok) await cache.put(asset, response);
      } catch {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('stride-app-') && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  if (url.pathname.includes('/_next/static/')) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      const cached = await cache.match(request) || (request.mode === 'navigate' ? await cache.match(new URL('', self.registration.scope)) : null);
      return cached || Response.error();
    }
  })());
});
