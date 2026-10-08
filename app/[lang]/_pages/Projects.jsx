import { pagePath } from '@/lib/site-data';
import { JOBS, KINDS, STOCK } from '@/lib/jobs';
import {
  Band,
  JobCard,
  JobRows,
  Lead,
  NextTicket,
  PageTitle,
  SubHeading,
  TicketStack,
} from '@/components/sections';

const SWATCH = { sheet: 'bg-sheet', canary: 'bg-canary', pink: 'bg-pink' };

export default function Projects({ lang, t }) {
  return (
    <>
      <Band className="!pb-4">
        <PageTitle>{t.projects.title}</PageTitle>
        <Lead>{t.projects.lead}</Lead>
        {/* The paper a job is on says what kind of job it was. Every group is
            also headed in words, so the colour is never the only cue. */}
        <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-7 gap-y-2 p-0 text-[0.95rem] text-ground-dim">
          {KINDS.map((kind) => (
            <li key={kind} className="inline-flex items-center gap-2.5">
              <span aria-hidden="true" className={`inline-block h-4 w-6 rounded-[2px] ${SWATCH[STOCK[kind]]}`} />
              {t.projects.groups[kind]}
            </li>
          ))}
        </ul>
      </Band>

      {/* In each group, a job with a screenshot gets a ticket of its own, and
          the jobs without one are entered as lines on a single sheet. */}
      {KINDS.map((kind) => {
        const jobs = JOBS.filter((j) => j.kind === kind);
        const shown = jobs.filter((j) => j.shot);
        const listed = jobs.filter((j) => !j.shot);
        return (
          <Band key={kind} id={kind} className="!py-8 sm:!py-10">
            <SubHeading>{t.projects.groups[kind]}</SubHeading>
            <div className="grid gap-6">
              {shown.length ? (
                <TicketStack>
                  {shown.map((j) => (
                    <JobCard key={j.id} job={j} t={t} lang={lang} />
                  ))}
                </TicketStack>
              ) : null}
              {listed.length ? <JobRows jobs={listed} t={t} stock={STOCK[kind]} /> : null}
            </div>
          </Band>
        );
      })}

      <NextTicket t={t} href={pagePath(lang, 'contact')} />
    </>
  );
}
