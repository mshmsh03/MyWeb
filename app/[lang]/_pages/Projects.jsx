import { pagePath } from '@/lib/site-data';
import { JOBS, siteUrl } from '@/lib/jobs';
import RequestBuilder from '@/components/RequestBuilder';
import { Band, BrowserFrame, DeviceScreen, Icon, Lead, Name, PageTitle, SubHeading, TextLink } from '@/components/sections';

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
// other, along ruled lines.
function JobLines({ jobs, t }) {
  return (
    <ul className="@container m-0 list-none border-t border-mat-line p-0">
      {jobs.map((j) => {
        const c = t.jobs[j.id];
        return (
          <li
            key={j.id}
            className="grid gap-x-10 gap-y-1 border-b border-mat-line py-4 @2xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] @2xl:items-baseline"
          >
            <div>
              <h3 className="display wd-wide m-0 text-[1.1rem] leading-snug font-bold rtl:leading-[1.6]">
                <Name>{c.name}</Name>
              </h3>
              <p className="m-0 text-chalk-dim">{c.job}</p>
            </div>
            <p className="m-0 max-w-[60ch] text-chalk-dim">{c.done}</p>
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
  const shot = (j) => ({ src: `/assets/work/${j.shot[lang]}`, width: j.shot.size[0], height: j.shot.size[1] });

  return (
    <>
      <Band rule={false} className="!pb-6 sm:!pb-10">
        <PageTitle>{t.projects.title}</PageTitle>
        <Lead className="mt-5">{t.projects.lead}</Lead>
      </Band>

      <Band id="websites">
        <SubHeading>{t.projects.groups.website}</SubHeading>
        <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {pictured('website').map((j) => {
            const c = t.jobs[j.id];
            return (
              <article key={j.id}>
                <BrowserFrame address={j.site} alt={c.alt} {...shot(j)} />
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
            <article key={j.id} className="mt-8 grid items-center gap-x-12 gap-y-7 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
              <DeviceScreen alt={c.alt} {...shot(j)} />
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
        <div className="mt-8">
          <JobLines jobs={of('print')} t={t} />
        </div>
      </Band>

      <div className="border-t border-mat-line">
        <RequestBuilder t={t.ticket} r={t.request} />
      </div>
    </>
  );
}
