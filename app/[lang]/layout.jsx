import { notFound } from 'next/navigation';
import Script from 'next/script';
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
  themeColor: '#1a2a7c',
};

export const metadata = {
  metadataBase: new URL(BASE),
  // asset() adds the GitHub Pages project prefix — Next does not apply
  // basePath to icon URLs in metadata.
  icons: { icon: [{ url: asset('/assets/favicon.svg'), type: 'image/svg+xml' }] },
};

// Arms motion before the first paint, so a sheet never shows its resting state
// for a frame and then starts over. It has to run inline and blocking: a
// deferred script would paint first and cause exactly that flash.
//
// Delivered through next/script at beforeInteractive rather than as a bare
// <script> tag. A raw script element inside a component is server-rendered but
// never executed on the client, so React logs a console error for it on every
// render; beforeInteractive is the supported way to get the same inline code
// into the initial HTML without that.
//
// The timer is the failsafe. Scroll reveals are hidden by CSS while data-motion
// is "on", so if the bundle never runs, MotionRoot never sets data-hydrated and
// motion is switched back off — leaving the page fully visible rather than
// stranded at opacity 0.
const ARM_MOTION = `(function(){try{var d=document.documentElement;
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.dataset.motion='on';
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
    <html
      lang={t.hreflang}
      dir={t.dir}
      className={`${archivo.variable} ${kufi.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="arm-motion" strategy="beforeInteractive">
          {ARM_MOTION}
        </Script>
      </head>
      <body>
        <MotionRoot />
        {/* Header and footer sit in the layout, not in the pages, so the router
            swaps only the page body between routes. */}
        <Header lang={lang} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
