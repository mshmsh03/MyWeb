import './bench.css';
import { NAME } from '@/lib/site-data';
import BenchStage from './BenchStage';
import { Laptop, Till, Tower } from './devices';

// The bench: what each device is, which exhibit it opens, and which need it
// fills in on the request builder.
export const DEVICES = [
  { id: 'websites', need: 'website', kind: 'laptop', Device: Laptop },
  { id: 'pos', need: 'pos', kind: 'till', Device: Till },
  { id: 'hardware', need: 'repair', kind: 'tower', Device: Tower },
];

// The first screen. Everything in it is server-rendered HTML and CSS, so the
// bench is complete before any script runs; BenchStage adds the pointer tilt
// and the transition into an exhibit once it has loaded. Without it, each
// device is a plain link to its exhibit.
export default function Bench({ lang, t }) {
  const [first, ...rest] = NAME.split(' ');
  return (
    <BenchStage className="pt-6 pb-10 sm:pt-10 sm:pb-14">
      <div className="wrap maker-wrap">
        <h1 className="maker" style={{ '--k1': 6.5, '--k2': 9.4, '--k3': 16.15 }}>
          <span className="ltr-fixed">
            <span className="n1">{first}</span> <span className="n2">{rest.join(' ')}</span>
          </span>
        </h1>
        <p className="label mt-3 mb-0 !text-[0.85rem] text-chalk-dim sm:mt-4 rtl:!text-[0.95rem]">{t.role}</p>
      </div>

      <ul className="bench wrap mt-2 sm:mt-0" role="list">
        {DEVICES.map(({ id, kind, Device }) => (
          <li key={id}>
            <a href={`#${id}`} className="plot" data-device={id}>
              <span className="dev" aria-hidden="true">
                <span className={`dev-pose ${kind}`}>
                  <Device lang={lang} />
                </span>
              </span>
              <span className="dim">
                <span className="label text-chalk">{t.bench.devices[id]}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="wrap mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 sm:mt-8">
        <p className="m-0 max-w-[60ch] text-chalk-dim">{t.offer}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#request"
            className="inline-flex min-h-12 items-center rounded-part bg-signal px-5 font-semibold text-graphite transition-colors hover:bg-[#ff8a5c]"
          >
            {t.bench.start}
          </a>
          <a
            href="#work"
            className="inline-flex min-h-12 items-center rounded-part border border-chalk-dim/60 px-5 font-semibold text-chalk transition-colors hover:border-chalk"
          >
            {t.bench.see}
          </a>
        </div>
      </div>
    </BenchStage>
  );
}
