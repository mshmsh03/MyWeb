import { asset } from '@/lib/site-data';
import { requestLinkProps } from '@/lib/request';

// The site viewer (the laptop's exhibit). Placeholder until it is built: the
// Ellin Company screenshot in a browser frame.
//
// `data-frame` marks the element the laptop's screen grows into when the
// laptop is chosen on the bench.
const SHOT = { en: 'ellin.jpg', ar: 'ellin-ar.jpg', ku: 'ellin-ku.jpg' };

export default function SiteViewer({ lang, t, requestHref = '#request' }) {
  return (
    <div>
      <div data-frame className="on-screen overflow-hidden rounded-part bg-screen text-graphite shadow-[0_22px_36px_-14px_rgb(3_18_13/0.75)]">
        <div className="flex items-center gap-1.5 bg-[#e6ebe7] px-3 py-2">
          <i className="size-2 rounded-full bg-[#b9c3be]" />
          <i className="size-2 rounded-full bg-[#b9c3be]" />
          <i className="size-2 rounded-full bg-[#b9c3be]" />
          <span className="ltr-fixed ms-3 truncate rounded-full bg-screen px-3 py-0.5 text-[0.8rem] text-graphite-soft">
            www.ellincompany.com
          </span>
        </div>
        <img
          src={asset(`/assets/work/${SHOT[lang]}`)}
          width="1200"
          height="572"
          alt={t.jobs.ellinSite.alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <a
        {...requestLinkProps(requestHref, 'website')}
        className="mt-7 inline-flex min-h-12 items-center rounded-part border border-chalk-dim/60 px-5 font-semibold text-chalk transition-colors hover:border-chalk"
      >
        {t.bench.start}
      </a>
    </div>
  );
}
