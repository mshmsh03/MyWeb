import { NAME, pagePath } from '@/lib/site-data';
import { Band, Field, Fields, Icon, NextTicket, PageTitle, Sheet, TextLink } from '@/components/sections';

// The clients named on the tickets, in the order they first appear. Read from
// the copy rather than typed again, so this row cannot drift from the tickets.
const CLIENT_JOBS = ['ellinSite', 'bvSite', 'chrispySite', 'krofi'];

// The same sheet as a ticket, filled in about the person who takes them. It
// is kept to a reading width: a sheet as wide as the page with five short
// lines on it is mostly blank paper.
export default function About({ lang, t }) {
  return (
    <>
      <Band className="!pb-10">
        <PageTitle>{t.about.title}</PageTitle>
        <Sheet perforated className="m-feed max-w-[820px] px-5 pb-6 sm:px-9 sm:pb-8">
          <Fields className="text-[1.05rem]">
            <Field label={t.about.name}>
              <span className="ltr-fixed font-semibold">{NAME}</span>
            </Field>
            {t.about.rows.map(([label, text]) => (
              <Field key={label} label={label}>
                <span className="block py-1">{text}</span>
              </Field>
            ))}
            <Field label={t.about.clients}>
              <span className="block py-1">
                {CLIENT_JOBS.map((id) => t.jobs[id].name).join(t.ticket.message.join)}
              </span>
              <TextLink href={pagePath(lang, 'projects')}>
                {t.home.allJobs}
                <Icon name="arrow" />
              </TextLink>
            </Field>
          </Fields>
        </Sheet>
      </Band>

      <NextTicket t={t} href={pagePath(lang, 'contact')} />
    </>
  );
}
