import { pagePath } from '@/lib/site-data';
import { JOBS, siteUrl } from '@/lib/jobs';
import RequestBuilder from '@/components/RequestBuilder';
import {
  Band,
  BrowserFrame,
  DeviceScreen,
  Icon,
  Lead,
  Name,
  PageTitle,
  RULE_ROW,
  RULE_TOP,
  RULED,
  SubHeading,
  TextLink,
} from '@/components/sections';

// The work as it would stand on the bench: websites in small browser windows,
// software on the screen of the device it runs on, and print work as a list
// until real pictures of it exist. A job only gets a picture when a real one
// is in the repository; the rest are lines under their group.

function JobText({ c, level = 'h3' }) {
  const H = level;
  return (
    <>
      <H className="display wd-wide m-0 text-[1.3rem] leading-snug font-extrabold rtl:leading-[1.6]">
        <Name>{c.name}</Name>
      </H>
      <p className="m-0 mt-1 font-semibold">{c.job}</p>
      <p className="m-0 mt-2 max-w-[60ch] text-chalk-dim">{c.done}</p>
    </>
  );
}

// Jobs without a picture: name and job on one side, what was done on the
// other, along ruled lines. The job is set like the pictured ones' (JobText),
// so it stands apart from what was done when the two sides stack.
function JobLines({ jobs, t }) {
  return (
    <ul className={`@container list-none p-0 ${RULED}`}>
      {jobs.map((j) => {
        const c = t.jobs[j.id];
        return (
          <li
            key={j.id}
            className={`grid gap-x-10 gap-y-2 ${RULE_ROW} @2xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] @2xl:items-baseline`}
          >
            <div>
              <h3 className="display wd-wide m-0 text-[1.1rem] leading-snug font-bold rtl:leading-[1.6]">
                <Name>{c.name}</Name>
              </h3>
              <p className="m-0 font-semibold text-pretty">{c.job}</p>
            </div>
            <p className="m-0 max-w-[60ch] text-pretty text-chalk-dim">{c.done}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default function Projects({ lang, t }) {
  const of = (kind) => JOBS.filter((j) => j.kind === kind);
  const pictured = (kind) => of(kind).filter((j) => j.shot);
  const lined = (kind) => of(kind).filter((j) => !j.shot);
  // `sizes` is the width each frame is drawn at: half the column beside
  // another frame, or seven twelfths of it beside the text, and nearly the
  // whole screen on a phone.
  const shot = (j, sizes) => ({
    src: `/assets/work/${j.shot[lang]}`,
    width: j.shot.size[0],
    height: j.shot.size[1],
    copies: j.shot.copies?.[lang],
    sizes,
  });
  const HALF = '(min-width: 1248px) 576px, (min-width: 768px) 46vw, 92vw';
  const WIDE = '(min-width: 1248px) 680px, (min-width: 1024px) 55vw, 92vw';

  return (
    <>
      <Band rule={false} className="sm:!pt-18 !pb-6 sm:!pb-12">
        <PageTitle>{t.projects.title}</PageTitle>
        <Lead className="mt-5">{t.projects.lead}</Lead>
      </Band>

      <Band id="websites">
        <SubHeading>{t.projects.groups.website}</SubHeading>
        <div className="on-grid mt-6 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {pictured('website').map((j, i) => {
            const c = t.jobs[j.id];
            return (
              <article key={j.id}>
                {/* The first frame is the largest thing on the first screen. */}
                <BrowserFrame address={j.site} alt={c.alt} first={i === 0} {...shot(j, HALF)} />
                <div className="mt-6">
                  <JobText c={c} />
                  <TextLink href={siteUrl(j, lang)} className="mt-2">
                    <span className="ltr-fixed">{j.site}</span>
                    <Icon name="out" />
                  </TextLink>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-12">
          <JobLines jobs={lined('website')} t={t} />
        </div>
      </Band>

      <Band id="software">
        <SubHeading>{t.projects.groups.software}</SubHeading>
        {pictured('software').map((j) => {
          const c = t.jobs[j.id];
          return (
            <article
              key={j.id}
              className="on-grid mt-6 grid items-center gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
            >
              <DeviceScreen alt={c.alt} {...shot(j, WIDE)} />
              <div>
                <JobText c={c} />
                <TextLink href={pagePath(lang, j.page)} className="mt-2">
                  {t.more}
                  <Icon name="arrow" />
                </TextLink>
              </div>
            </article>
          );
        })}
        <div className="mt-12">
          <JobLines jobs={lined('software')} t={t} />
        </div>
      </Band>

      <Band id="print">
        <SubHeading>{t.projects.groups.print}</SubHeading>
        <div className="mt-6">
          <JobLines jobs={of('print')} t={t} />
        </div>
      </Band>

      <div className={RULE_TOP}>
        <RequestBuilder t={t.ticket} r={t.request} />
      </div>
    </>
  );
}
