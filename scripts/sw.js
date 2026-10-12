// The site's service worker: the pages keep working without a connection, the
// way the till he builds keeps selling without one.
//
// scripts/offline.mjs fills in the four constants below and publishes the
// result as {BASE}/sw.js, so the shell list is read from each build's own
// output and cannot drift from it.
//
//   Pages        network first; the saved copy when the network fails or
//                stalls; the offline page in the visitor's language when
//                there is no saved copy.
//   /_next/static/  hashed, never change: cache first.
//   /assets/     pictures: saved the first time they are used.
//
// Only requests to this site, under its own path, are handled. Everything
// else (the WhatsApp, mail and phone links among them) goes past untouched.
const BASE = '/*{{BASE}}*/';
const VERSION = '/*{{VERSION}}*/';
const SHELL = /*{{SHELL}}*/ [];
const LANGS = /*{{LANGS}}*/ [];

// Other projects can share this origin (user.github.io/<repo>/), so the
// caches carry the site's path and only ours are ever deleted.
const PREFIX = `bench:${BASE}/:`;
const CACHE = PREFIX + VERSION;

// How long a page may wait for the network before the saved copy is shown.
// The network answer still replaces the saved copy when it arrives.
const STALL_MS = 4000;

const isStatic = (path) => path.startsWith(`${BASE}/_next/static/`) || path.startsWith(`${BASE}/assets/`);

// Pages are saved under their address without the query, so a link with
// tracking parameters does not save a second copy.
const pageKey = (url) => url.origin + url.pathname;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Pages are revalidated, so a page left in the HTTP cache by the last
      // build is not saved beside this build's files. Hashed files are safe
      // to take from the HTTP cache.
      .then((cache) =>
        cache.addAll(SHELL.map((u) => new Request(u, { cache: isStatic(u) ? 'default' : 'no-cache' }))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
      }
      // Lets the page request start while the worker is still waking up.
      if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);
  if (url.origin !== location.origin || !url.pathname.startsWith(`${BASE}/`)) return;

  if (isStatic(url.pathname)) event.respondWith(cacheFirst(request));
  else if (request.mode === 'navigate') event.respondWith(page(event, url));
  // The router's page data (index.txt and the like) and the manifests.
  else event.respondWith(networkFirst(request, url));
});

// The page asks for what it loaded before this worker was in charge (the page
// itself and its files), so the first page a visitor sees is kept as well.
self.addEventListener('message', (event) => {
  const { keep } = event.data ?? {};
  if (!keep || !Array.isArray(keep.files)) return;
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const save = async (href, key) => {
        if (await cache.match(key, { ignoreVary: true })) return;
        const res = await fetch(href);
        if (res.ok && res.type === 'basic' && !res.redirected) await cache.put(key, res);
      };
      const jobs = [];
      for (const href of keep.files) {
        const url = new URL(href, location.href);
        if (url.origin === location.origin && isStatic(url.pathname)) jobs.push(save(url.href, url.href));
      }
      // Every page's address ends in a slash (trailingSlash in next.config.js).
      const page = typeof keep.page === 'string' && new URL(keep.page, location.href);
      if (page && page.origin === location.origin && page.pathname.startsWith(`${BASE}/`) && page.pathname.endsWith('/')) {
        jobs.push(save(pageKey(page), pageKey(page)));
      }
      await Promise.allSettled(jobs);
    })(),
  );
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok && res.type === 'basic') cache.put(request, res.clone());
  return res;
}

async function networkFirst(request, url) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    if (res.ok && res.type === 'basic' && !res.redirected) cache.put(pageKey(url), res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(pageKey(url), { ignoreVary: true });
    if (hit) return hit;
    throw err;
  }
}

async function page(event, url) {
  const cache = await caches.open(CACHE);
  const network = (async () => (await event.preloadResponse) || fetch(event.request))();
  // A redirected response cannot answer a navigation, and an error page must
  // not replace a good copy.
  const stored = network.then((res) =>
    res.ok && res.type === 'basic' && !res.redirected ? cache.put(pageKey(url), res.clone()) : null,
  );
  event.waitUntil(stored.catch(() => {}));

  const saved = await savedPage(cache, url);
  if (!saved) return network.catch(() => offlinePage(cache, url));
  const stall = new Promise((resolve) => setTimeout(resolve, STALL_MS, saved));
  return Promise.race([network, stall]).catch(() => saved);
}

// /MyWeb/en/about and /MyWeb/en/about/ are the same page on GitHub Pages.
async function savedPage(cache, url) {
  const key = pageKey(url);
  return (
    (await cache.match(key, { ignoreVary: true })) ??
    (/\/[^/.]+$/.test(url.pathname) ? await cache.match(`${key}/`, { ignoreVary: true }) : undefined)
  );
}

// The language of the address, or of the browser for an address without one.
async function offlinePage(cache, url) {
  const segment = url.pathname.slice(BASE.length + 1).split('/')[0];
  let lang = LANGS.includes(segment) ? segment : 'en';
  if (!LANGS.includes(segment)) {
    const nav = (self.navigator.language || '').toLowerCase();
    if (nav.startsWith('ar')) lang = 'ar';
    else if (nav.startsWith('ckb') || nav.startsWith('ku')) lang = 'ku';
  }
  const res = await cache.match(`${BASE}/offline/${lang}.html`, { ignoreVary: true });
  return res ?? Response.error();
}
