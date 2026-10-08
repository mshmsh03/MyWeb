import { SHOTS, pagePath } from '@/lib/site-data';
import { STOCK, job } from '@/lib/jobs';
import {
  Band,
  Field,
  Fields,
  Heading,
  Icon,
  JobRows,
  NextTicket,
  RuledList,
  RuledRow,
  Serial,
  Sheet,
  Shot,
  Split,
  TextLink,
} from '@/components/sections';

const QASA = job('qasa');

export default function Qasa({ lang, t }) {
  const q = t.qasa;
  // The Kurdish page leads with the Kurdish screen and shows the English one
  // as the mirror; the other two languages do the reverse.
  const lead = lang === 'ku' ? SHOTS.qasaSellKu : SHOTS.qasaSell;
  const mirror = lang === 'ku' ? SHOTS.qasaSell : SHOTS.qasaSellKu;
  // The list of what is in it is long, so it is written in two columns.
  const half = Math.ceil(q.inside.rows.length / 2);

  return (
    <>
      <Band className="!pt-6 !pb-8">
        <TextLink href={pagePath(lang, 'projects')} ground className="m-fade mb-3">
          <Icon name="arrow" className="-scale-x-100 rtl:scale-x-100" />
          {t.projects.title}
        </TextLink>

        <Sheet stock={STOCK[QASA.kind]} className="m-feed p-5 sm:p-9">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            {/* A product name, so it stays in Latin in every language. */}
            <h1 className="display wd-wide m-0 text-[clamp(2.2rem,6vw,4rem)] leading-none font-black tracking-[-0.02em]">
              <span className="ltr-fixed">Qasa POS</span>
            </h1>
            <Serial no={QASA.no} label={t.no} />
          </div>
          <p className="wd-cond m-0 mt-3 text-[1.05rem] leading-snug font-semibold tracking-[0.04em] text-form uppercase rtl:text-[1.1rem] rtl:tracking-normal">
            {q.role}
          </p>
          <p className="m-0 mt-4 mb-6 max-w-[62ch] text-[1.05rem]">{q.lead}</p>
          <Fields>
            {q.facts.map(([label, value, machine]) => (
              <Field key={label} label={label}>
                <span className={machine ? 'ltr-fixed font-semibold' : 'font-semibold'}>{value}</span>
              </Field>
            ))}
          </Fields>
        </Sheet>
      </Band>

      <Band className="!pt-4">
        <Shot shot={lead} alt={q.leadAlt} caption={q.leadCaption} ground />
      </Band>

      <Band>
        <Heading>{q.money.heading}</Heading>
        <RuledList>
          {q.money.rows.map(([term, text]) => (
            <RuledRow key={term} term={term}>
              {text}
            </RuledRow>
          ))}
        </RuledList>
      </Band>

      <Band>
        <Heading>{q.rtl.heading}</Heading>
        <Split media={<Shot shot={mirror} alt={q.rtl.alt} ground />}>
          <p className="m-0 max-w-[46ch] text-[1.05rem] text-ground-dim">{q.rtl.text}</p>
        </Split>
      </Band>

      <Band>
        <Heading>{q.inside.heading}</Heading>
        <div className="grid gap-6">
          <Shot shot={SHOTS.qasaReports} alt={q.inside.alt} caption={q.inside.caption} ground />
          <Sheet className="grid gap-x-10 p-5 sm:p-7 md:grid-cols-2">
            {[q.inside.rows.slice(0, half), q.inside.rows.slice(half)].map((rows, i) => (
              <Fields key={i} className={i ? 'max-md:border-t-0' : ''}>
                {rows.map(([term, text]) => (
                  <Field key={term} label={term}>
                    {text}
                  </Field>
                ))}
              </Fields>
            ))}
          </Sheet>
        </div>
      </Band>

      <Band className="!pb-8">
        <Heading>{q.client}</Heading>
        <JobRows jobs={[job('chrispyPos')]} t={t} stock={STOCK.software} />
      </Band>

      <NextTicket t={t} href={pagePath(lang, 'contact')} />
    </>
  );
}
