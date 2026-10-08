import { NAME, pagePath } from '@/lib/site-data';
import { job } from '@/lib/jobs';
import JobTicket from '@/components/JobTicket';
import {
  Band,
  Button,
  Heading,
  Icon,
  JobCard,
  NextTicket,
  RuledList,
  RuledRow,
  TicketStack,
} from '@/components/sections';

// The three tickets shown in full on the home page: the two live client sites
// and the sample till. Everything else is on the Projects page.
const SHOWN = ['ellinSite', 'bvSite', 'qasa'];

export default function Home({ lang, t }) {
  return (
    <>
      <Band id="ticket" className="!pt-8 sm:!pt-10">
        <JobTicket t={t.ticket}>
          {/* Printed across the top of the sheet the way a business prints its
              name on its own ticket book. A name, so it stays in Latin. */}
          <div className="mt-4 border-b-[3px] border-double border-ink/70 pb-6">
            <h1 className="display wd-wide m-0 text-[clamp(1.9rem,5.2vw,3.6rem)] leading-none font-black tracking-[-0.02em] uppercase">
              <span className="ltr-fixed">{NAME}</span>
            </h1>
            <p className="wd-cond m-0 mt-3 text-[1.05rem] leading-snug font-semibold tracking-[0.04em] text-form uppercase rtl:text-[1.1rem] rtl:tracking-normal">
              {t.role}
            </p>
            <p className="m-0 mt-3 max-w-[60ch] text-[1.05rem] text-ink-soft">{t.offer}</p>
          </div>
        </JobTicket>
      </Band>

      <Band id="jobs">
        <Heading>{t.home.jobs}</Heading>
        <TicketStack>
          {SHOWN.map((id) => (
            <JobCard key={id} job={job(id)} t={t} lang={lang} />
          ))}
        </TicketStack>
        <div className="mt-8">
          <Button href={pagePath(lang, 'projects')} tone="canary">
            {t.home.allJobs}
            <Icon name="arrow" />
          </Button>
        </div>
      </Band>

      <Band id="services">
        <Heading>{t.home.services}</Heading>
        <RuledList>
          {t.services.map((s) => (
            <RuledRow key={s.title} term={s.title}>
              {s.text}
            </RuledRow>
          ))}
        </RuledList>
      </Band>

      <NextTicket t={t} href="#ticket" />
    </>
  );
}
