import { asset } from '@/lib/site-data';
import { requestLinkProps } from '@/lib/request';

// The live till (the till's exhibit). Placeholder until it is built: the Qasa
// sell screen. Qasa has no Arabic screenshot; the Kurdish one shows the same
// right-to-left mirror.
//
// `data-frame` marks the element the till's screen grows into when the till
// is chosen on the bench.
const SHOT = { en: 'qasa-sell-en.png', ar: 'qasa-sell-ckb.png', ku: 'qasa-sell-ckb.png' };

export default function Till({ lang, t, requestHref = '#request' }) {
  return (
    <div>
      <div data-frame className="rounded-[10px] bg-graphite p-2.5 shadow-[0_22px_36px_-14px_rgb(3_18_13/0.75)]">
        <img
          src={asset(`/assets/work/${SHOT[lang]}`)}
          width="1366"
          height="820"
          alt={t.jobs.qasa.alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full rounded-[3px]"
        />
      </div>
      <a
        {...requestLinkProps(requestHref, 'pos')}
        className="mt-7 inline-flex min-h-12 items-center rounded-part border border-chalk-dim/60 px-5 font-semibold text-chalk transition-colors hover:border-chalk"
      >
        {t.bench.start}
      </a>
    </div>
  );
}
