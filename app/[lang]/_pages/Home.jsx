import Link from 'next/link';
import { pagePath } from '@/lib/site-data';
import { JOBS } from '@/lib/jobs';
import Bench, { DEVICES } from '@/components/bench/Bench';
import RequestBuilder from '@/components/RequestBuilder';
import SiteViewer from '@/components/exhibits/viewer';
import Till from '@/components/exhibits/till';
import Teardown from '@/components/exhibits/teardown';

const H2 =
  'display wd-display m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.015em] outline-none rtl:leading-[1.45] rtl:tracking-normal';

// What each device on the bench opens: its working exhibit.
const EXHIBITS = { websites: SiteViewer, pos: Till, hardware: Teardown };

// A client or product name written in Latin stays in the Latin face, and
// left-to-right, inside an Arabic or Kurdish line.
const latin = (s) => (/^[ -~]+$/.test(s) ? <span className="ltr-fixed">{s}</span> : s);

export default function Home({ lang, t }) {
  return (
    <>
      <Bench lang={lang} t={t} />

      {/* One section per device: what the service is, then the exhibit that
          shows it working. The heading takes focus when a device is chosen. */}
      {DEVICES.map(({ id }, i) => {
        const service = t.services[i];
        const Exhibit = EXHIBITS[id];
        return (
          <section key={id} id={id} className="scroll-mt-20 border-t border-mat-line py-16 sm:py-24">
            <div className="wrap">
              <h2 tabIndex={-1} className={H2}>
                {service.title}
              </h2>
              <p className="m-0 mt-4 max-w-[60ch] text-chalk-dim">{service.text}</p>
              <div className="mt-10 sm:mt-12">
                <Exhibit lang={lang} t={t} requestHref="#request" />
              </div>
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
