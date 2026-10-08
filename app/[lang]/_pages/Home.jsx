import Link from 'next/link';
import { asset, pagePath } from '@/lib/site-data';
import { JOBS } from '@/lib/jobs';
import Bench, { DEVICES } from '@/components/bench/Bench';
import { Tower } from '@/components/bench/devices';
import RequestBuilder from '@/components/RequestBuilder';

// The screenshot each exhibit opens on, in the page's own language. Qasa has
// no Arabic screenshot; the Kurdish one shows the same right-to-left mirror.
const SITE_SHOT = { en: 'ellin.jpg', ar: 'ellin-ar.jpg', ku: 'ellin-ku.jpg' };
const TILL_SHOT = { en: 'qasa-sell-en.png', ar: 'qasa-sell-ckb.png', ku: 'qasa-sell-ckb.png' };

const H2 =
  'display wd-display m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.015em] outline-none rtl:leading-[1.45] rtl:tracking-normal';

// What each device's screen grows into when it is chosen.
function Frame({ id, lang, t }) {
  if (id === 'websites') {
    return (
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
          src={asset(`/assets/work/${SITE_SHOT[lang]}`)}
          width="1200"
          height="572"
          alt={t.jobs.ellinSite.alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    );
  }
  if (id === 'pos') {
    return (
      <div data-frame className="rounded-[10px] bg-graphite p-2.5 shadow-[0_22px_36px_-14px_rgb(3_18_13/0.75)]">
        <img
          src={asset(`/assets/work/${TILL_SHOT[lang]}`)}
          width="1366"
          height="820"
          alt={t.jobs.qasa.alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full rounded-[3px]"
        />
      </div>
    );
  }
  return (
    <div data-frame className="bench-solo relative mx-auto w-full max-w-[420px] [--floor:24px] [--plot-h:330px] [--s:0.92] [--turn:38deg] sm:[--plot-h:400px] sm:[--s:1.12]">
      <div className="plot">
        <span className="dev" aria-hidden="true">
          <span className="dev-pose tower">
            <Tower />
          </span>
        </span>
      </div>
    </div>
  );
}

// A client or product name written in Latin stays in the Latin face, and
// left-to-right, inside an Arabic or Kurdish line.
const latin = (s) => (/^[ -~]+$/.test(s) ? <span className="ltr-fixed">{s}</span> : s);

export default function Home({ lang, t }) {
  return (
    <>
      <Bench lang={lang} t={t} />

      {DEVICES.map(({ id, need }, i) => {
        const service = t.services[i];
        return (
          <section key={id} id={id} className="scroll-mt-20 border-t border-mat-line py-16 sm:py-24">
            <div className="wrap grid items-center gap-x-12 gap-y-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div>
                <h2 tabIndex={-1} className={H2}>
                  {service.title}
                </h2>
                <p className="m-0 mt-4 max-w-[52ch] text-chalk-dim">{service.text}</p>
                <a
                  href="#request"
                  data-need={need}
                  className="mt-7 inline-flex min-h-12 items-center rounded-part border border-chalk-dim/60 px-5 font-semibold text-chalk transition-colors hover:border-chalk"
                >
                  {t.bench.start}
                </a>
              </div>
              <Frame id={id} lang={lang} t={t} />
            </div>
          </section>
        );
      })}

      <section id="work" className="scroll-mt-20 border-t border-mat-line py-16 sm:py-24">
        <div className="wrap">
          <h2 className={H2}>{t.home.jobs}</h2>
          <ul className="m-0 mt-8 list-none border-t border-mat-line p-0">
            {JOBS.map((job) => {
              const c = t.jobs[job.id];
              return (
                <li
                  key={job.id}
                  className="grid gap-x-10 gap-y-0.5 border-b border-mat-line py-4 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] sm:items-baseline"
                >
                  <span className="display wd-wide text-[1.1rem] leading-snug font-bold rtl:leading-[1.6]">
                    {latin(c.name)}
                  </span>
                  <span className="text-chalk-dim">{c.job}</span>
                </li>
              );
            })}
          </ul>
          <Link
            href={pagePath(lang, 'projects')}
            className="mt-6 inline-flex min-h-11 items-center font-semibold underline decoration-ruler decoration-2 underline-offset-4 transition-colors hover:text-ruler"
          >
            {t.home.allJobs}
          </Link>
        </div>
      </section>

      <div className="border-t border-mat-line">
        <RequestBuilder t={t.ticket} r={t.request} />
      </div>
    </>
  );
}
