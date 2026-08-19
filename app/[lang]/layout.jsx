import { notFound } from 'next/navigation';
import Script from 'next/script';
import { LANGS, SITE, asset } from '@/lib/site-data';
import { BASE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionRoot from '@/components/MotionRoot';
import FlowBackground from '@/components/FlowBackground';
import '../globals.css';

export const viewport = {
  themeColor: '#0d1117',
};

export const metadata = {
  metadataBase: new URL(BASE),
  // asset() adds the GitHub Pages project prefix — Next does not apply
  // basePath to icon URLs in metadata.
  icons: { icon: [{ url: asset('/assets/favicon.svg'), type: 'image/svg+xml' }] },
};

// Arms motion before the first paint, so the typewriter and the scroll reveals
// never show their finished state for a frame and then start over. It has to
// run inline and blocking: a deferred script would paint first and cause
// exactly that flash.
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
    <html lang={t.hreflang} dir={t.dir}>
      <head>
        {t.dir === 'rtl' ? (
          <>
            {/* Only the RTL documents pull a webfont: the Latin identity is the
                system monospace stack, but neither Arabic nor Kurdish Sorani
                has a system mono to fall back to. */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap"
            />
          </>
        ) : null}
        <Script id="arm-motion" strategy="beforeInteractive">
          {ARM_MOTION}
        </Script>
      </head>
      {/* .scanlines paints the CRT wash over everything via a fixed ::after. */}
      <body className="scanlines">
        <MotionRoot />
        {/* Header and footer sit in the layout, not in the pages, so the router
            swaps only the page body between routes — and the background canvas
            keeps drifting across a navigation instead of restarting. */}
        <Header lang={lang} />
        <FlowBackground />
        <main className="relative z-1 block">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
