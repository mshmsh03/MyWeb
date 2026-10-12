// Makes the link-preview pictures in public/assets/preview/: one per page and
// language, 1200×630, the size WhatsApp, Telegram, Facebook and X all crop
// from. Each is a photograph of the site's own first screen (the name on the
// mat and the three devices) with the page's name under the name, so the
// picture cannot drift from what the bench really looks like.
//
// The pictures are committed; the deploy build does not make them, because it
// has no browser. Run this by hand after the bench or a page name changes:
//
//   npm run build
//   node scripts/make-previews.mjs        (CHROME=/path/to/chrome if needed)
//   npm run build                         (copies the new pictures into out/)
//
// It needs no package: Node's own http server serves out/, and Chrome is
// driven over its DevTools protocol with Node's built-in WebSocket (Node 22+).
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, normalize } from 'node:path';
import { LANGS, PAGE_META } from '../lib/site-data.js';

const OUT = 'out';
const DEST = 'public';
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/MyWeb';
const W = 1200;
const H = 630;
// JPEG at this quality keeps each picture between 80KB and 95KB; WhatsApp drops a
// preview picture over about 300KB.
const QUALITY = 82;

if (!existsSync(join(OUT, 'en', 'index.html'))) {
  console.error('make-previews: run `npm run build` first; out/ has no pages');
  process.exit(1);
}

// The name each picture carries under the maker's name: the part of the
// page's title before the site name, as pageName() in lib/metadata.js reads
// it. The home page's title is the name alone, so its picture keeps the role
// line the page already has.
function pageName(lang, page) {
  const [name, rest] = PAGE_META[lang][page].title.split(' | ');
  return rest ? name : null;
}

// --- out/ served under the base path, as GitHub Pages serves it ---
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.txt': 'text/plain',
};
const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!path.startsWith(`${BASE}/`)) return res.writeHead(404).end();
  path = normalize(path.slice(BASE.length)).replace(/^(\.\.[/\\])+/, '');
  if (path.endsWith('/')) path += 'index.html';
  const file = join(OUT, path);
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const origin = `http://127.0.0.1:${server.address().port}`;

// --- Chrome ---
const CANDIDATES = [
  process.env.CHROME,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);
const chromePath = CANDIDATES.find((p) => existsSync(p));
if (!chromePath) {
  console.error('make-previews: no Chrome found; set CHROME to its path');
  server.close();
  process.exit(1);
}
const profile = mkdtempSync(join(tmpdir(), 'previews-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  // Chrome will not start its sandbox as root (a container, CI); it only
  // ever opens this site's own pages here.
  ...(process.getuid?.() === 0 ? ['--no-sandbox'] : []),
  'about:blank',
]);
const wsUrl = await new Promise((ok, fail) => {
  let err = '';
  chrome.stderr.on('data', (d) => {
    err += d;
    const m = err.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) ok(m[1]);
  });
  chrome.on('exit', () => fail(new Error(`Chrome exited before it was ready:\n${err}`)));
});

// A minimal DevTools client: send() resolves with the command's result, and
// once() waits for the next event of a name on a session.
const ws = new WebSocket(wsUrl);
await new Promise((ok) => ws.addEventListener('open', ok, { once: true }));
let nextId = 1;
const pending = new Map();
const waiters = [];
ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) {
    const { ok, fail } = pending.get(msg.id);
    pending.delete(msg.id);
    return msg.error ? fail(new Error(msg.error.message)) : ok(msg.result);
  }
  for (const w of [...waiters]) {
    if (w.method === msg.method && w.sessionId === msg.sessionId) {
      waiters.splice(waiters.indexOf(w), 1);
      w.ok(msg.params);
    }
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((ok, fail) => {
    const id = nextId++;
    pending.set(id, { ok, fail });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
const once = (method, sessionId) => new Promise((ok) => waiters.push({ method, sessionId, ok }));

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId: s } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, s);
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false }, s);
// Motion off, so every device is at rest in its set pose.
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }, s);

// What turns the home page's first screen into the picture: the header and
// everything below the bench go, the role line becomes the page's name, and
// the bench is set in the middle of the frame.
async function compose(name, PAD_TOP) {
  // Wait for the page's script to take over the bench (MotionRoot marks it),
  // so React does not redraw the bench after it has been changed here.
  for (let i = 0; i < 100 && document.documentElement.dataset.hydrated !== '1'; i++) {
    await new Promise((r) => setTimeout(r, 50));
  }
  const style = document.createElement('style');
  style.textContent = `header, a[href="#main"], footer, main > :not(.preview-bench), ul.bench ~ * { display: none !important; }`;
  document.head.append(style);
  const maker = document.querySelector('.maker-wrap');
  const bench = [...document.querySelector('main').children].find((c) => c.contains(maker));
  bench.classList.add('preview-bench');
  bench.style.setProperty('padding-top', `${PAD_TOP}px`, 'important');

  // The site's utilities are in a cascade layer and use !important, which
  // only an inline !important outranks.
  const role = maker.querySelector('p.label');
  const rtl = document.documentElement.dir === 'rtl';
  const set = (p, v) => role.style.setProperty(p, v, 'important');
  set('margin-top', '20px');
  set('color', '#F2D24B');
  set('font-size', name ? '38px' : '28px');
  set('line-height', '1.25');
  set('font-weight', '800');
  if (rtl) {
    set('font-family', 'var(--font-kufi), sans-serif');
    set('letter-spacing', 'normal');
  }
  if (name) {
    // A Latin name (Qasa POS) keeps its own direction without moving off the
    // reading start.
    const span = document.createElement('span');
    if (/^[A-Za-z]/.test(name)) {
      span.dir = 'ltr';
      span.style.fontFamily = 'var(--font-archivo), sans-serif';
    }
    span.textContent = name;
    role.replaceChildren(span);
  }
  return Promise.all([
    document.fonts.ready,
    ...[...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))),
  ]).then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

// Where each picture goes is read from the built page's own og:image, so the
// file names are written down once, in lib/metadata.js.
function imagePath(lang, page) {
  const html = readFileSync(join(OUT, lang, page === 'index' ? '' : page, 'index.html'), 'utf8');
  const url = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (!url) throw new Error(`make-previews: ${lang}/${page} has no og:image; build first`);
  return decodeURIComponent(new URL(url).pathname).slice(BASE.length);
}

for (const lang of LANGS) {
  for (const page of Object.keys(PAGE_META[lang])) {
    const loaded = once('Page.loadEventFired', s);
    await send('Page.navigate', { url: `${origin}${BASE}/${lang}/` }, s);
    await loaded;
    const name = pageName(lang, page);
    const { exceptionDetails } = await send(
      'Runtime.evaluate',
      { expression: `(${compose})(${JSON.stringify(name)}, 48)`, awaitPromise: true },
      s,
    );
    if (exceptionDetails) throw new Error(`make-previews: ${lang}/${page}: ${exceptionDetails.exception?.description}`);
    const { data } = await send(
      'Page.captureScreenshot',
      { format: 'jpeg', quality: QUALITY, clip: { x: 0, y: 0, width: W, height: H, scale: 1 } },
      s,
    );
    const file = join(DEST, imagePath(lang, page));
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, Buffer.from(data, 'base64'));
    console.log(`${file}  ${(Buffer.byteLength(data, 'base64') / 1024).toFixed(1)}KB`);
  }
}

ws.close();
server.close();
// The profile can only go once Chrome has stopped writing to it.
await new Promise((ok) => {
  chrome.on('exit', ok);
  chrome.kill();
});
rmSync(profile, { recursive: true, force: true, maxRetries: 3 });
