import { notFound } from 'next/navigation';
import { Archivo, Noto_Kufi_Arabic, Noto_Sans_Arabic } from 'next/font/google';
import { LANGS, SITE, asset } from '@/lib/site-data';
import { BASE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionRoot from '@/components/MotionRoot';
import '../globals.css';

// next/font fetches these at build time and ships them from the site's own
// files, so no visitor's browser ever calls a font host.
//
// One Latin family does everything a printed form asks of type: `wdth` is its
// width axis, and the labels, the text and the headers are the same face set
// condensed, normal and expanded.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

// Arabic and Kurdish Sorani: a kufi for the printed headers, a plain sans for
// reading. Both carry the Kurdish letters (ڕ ڵ ۆ ێ ە) that many Arabic faces
// omit. Not preloaded — the English pages never draw a glyph from either, and
// a preload would make every visitor download them anyway.
const kufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-kufi',
  display: 'swap',
  preload: false,
});
const arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  preload: false,
});

export const viewport = {
  themeColor: '#0f3d30',
};

export const metadata = {
  metadataBase: new URL(BASE),
  // asset() adds the GitHub Pages project prefix — Next does not apply
  // basePath to icon URLs in metadata.
  icons: { icon: [{ url: asset('/assets/favicon.svg'), type: 'image/svg+xml' }] },
};

// Arms motion before the first paint, so nothing shows its resting state for a
// frame and then starts over. It has to run inline and blocking: a deferred
// script would paint first and cause exactly that flash.
//
// Motion is on unless the visitor has asked their system for less, or has
// switched Effects off in the header (remembered in localStorage, which wins
// over the system setting in either direction).
//
// A plain <script> in <head>, written into the HTML by the server. The
// browser runs it while it parses the head. next/script's beforeInteractive
// would not do: in a static export it only queues the code for Next's own
// bundle to run, which is after first paint and often after pagereveal.
// React never runs a script element on the client, which is fine, as the
// page is not rendered in the browser before this has run.
//
// It also decides the transition into this page when it was reached by a full
// page load from another page of the site, which in practice is the language
// switch: with motion on, the page turns in like a mirror (data-vt, styled in
// globals.css); with motion off, the transition is skipped.
//
// The timer is the failsafe: if the bundle never runs, MotionRoot never sets
// data-hydrated and motion is switched back off.
const ARM_MOTION = `(function(){try{var d=document.documentElement,s=null;
try{s=localStorage.getItem('effects');}catch(e){}
var on=s?s==='on':!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
d.dataset.motion=on?'on':'off';
addEventListener('pagereveal',function(e){var v=e.viewTransition;if(!v)return;
if(d.dataset.motion!=='on'){v.skipTransition();return;}
d.dataset.vt='mirror';v.finished.finally(function(){delete d.dataset.vt;});});
if(!on)return;
setTimeout(function(){if(d.dataset.hydrated!=='1')d.dataset.motion='off';},3000);
}catch(e){}})();`;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// Any [lang] outside generateStaticParams 404s instead of being rendered, and
// it keeps the static export honest: with `output: 'export'` the build has to
// know the complete route list up front, and this is what says so.
export const dynamicParams = false;

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  const t = SITE[lang];

  return (
    // The inline script above sets data-motion on this element before React
    // hydrates, which is the one attribute the server could not have known.
    //
    // data-scroll-behavior tells the router that scrolling is smooth when
    // motion is on, so it jumps to the top of a new page instead of gliding.
    <html
      lang={t.hreflang}
      dir={t.dir}
      className={`${archivo.variable} ${kufi.variable} ${arabic.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ARM_MOTION }} />
      </head>
      <body>
        <MotionRoot />
        {/* The first stop for the keyboard: past the header to the page. */}
        <a
          href="#main"
          className="sr-only z-[60] rounded-part bg-ruler px-4 py-3 font-semibold text-graphite focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
        >
          {t.skip}
        </a>
        {/* Header and footer sit in the layout, not in the pages, so the router
            swaps only the page body between routes. */}
        <Header lang={lang} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
