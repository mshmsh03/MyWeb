import { NAME, pagePath } from '@/lib/site-data';
import RequestBuilder from '@/components/RequestBuilder';
import { Band, Icon, Name, PageTitle, TextLink } from '@/components/sections';
import './about.css';

// The clients named in the work, in the order they first appear. Read from
// the copy rather than typed again, so this row cannot drift from the list.
const CLIENT_JOBS = ['ellinSite', 'bvSite', 'chrispySite', 'krofi'];

// The facts about him, laid out as the specification plate on the back of a
// device: a light plate of label-and-value rows, riveted to a graphite back
// panel with its vents, fan and power inlet beside it.
export default function About({ lang, t }) {
  // The name is the plate's heading, so the rows start with what he does.
  const rows = [
    ...t.about.rows,
    [
      t.about.clients,
      <>
        {/* Each name is isolated, so Latin names keep their place in an
            Arabic or Kurdish list. */}
        {CLIENT_JOBS.map((id, i) => (
          <span key={id}>
            {i ? t.ticket.message.join : null}
            <Name>{t.jobs[id].name}</Name>
          </span>
        ))}
        <br />
        <TextLink href={pagePath(lang, 'projects')} screen>
          {t.home.allJobs}
          <Icon name="arrow" />
        </TextLink>
      </>,
    ],
  ];

  return (
    <>
      <Band rule={false} className="!pb-16 sm:!pb-24">
        <PageTitle>{t.about.title}</PageTitle>

        <div className="relative mt-10 grid max-w-[1008px] gap-6 rounded-[14px] bg-graphite p-3 shadow-[0_26px_40px_-16px_rgb(3_18_13/0.8)] sm:mt-14 sm:p-6 md:grid-cols-[minmax(0,1fr)_168px]">
          {/* Screw heads in the panel's corners. */}
          <span aria-hidden="true" className="about-screws pointer-events-none absolute inset-3 hidden sm:block" />

          <div className="on-screen rounded-[6px] bg-[#e9eeea] p-5 text-graphite ring-1 ring-black/10 sm:p-8">
            <p className="wd-display m-0 text-[clamp(1.25rem,2.4vw,1.7rem)] leading-tight font-black uppercase">
              <span className="sr-only">{t.about.name}: </span>
              <span className="ltr-fixed">{NAME}</span>
            </p>
            <p className="label m-0 mt-2 text-graphite-soft">{t.role}</p>
            <dl className="m-0 mt-5 grid grid-cols-1 border-t-[3px] border-double border-graphite/60 sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-8">
              {rows.map(([label, value]) => (
                <div key={label} className="col-span-full grid grid-cols-subgrid border-b border-graphite/20 py-3">
                  <dt className="label pt-1 text-graphite-soft">{label}</dt>
                  <dd className="m-0 mt-1 max-w-[60ch] sm:mt-0">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The rest of the back panel: a fan behind its guard, a row of
              vents and the power inlet. Drawing only. */}
          <div aria-hidden="true" className="hidden flex-col items-center justify-between gap-6 py-4 md:flex">
            <span className="about-fan block size-[132px] rounded-full" />
            <span className="about-vents block h-24 w-full max-w-[120px]" />
            <span className="about-inlet block h-11 w-16 rounded-[6px]" />
          </div>
        </div>
      </Band>

      <div className="border-t border-mat-line">
        <RequestBuilder t={t.ticket} r={t.request} />
      </div>
    </>
  );
}
