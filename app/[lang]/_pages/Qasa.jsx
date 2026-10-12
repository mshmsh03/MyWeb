import { SHOTS, pagePath } from '@/lib/site-data';
import RequestBuilder from '@/components/RequestBuilder';
import Till from '@/components/exhibits/till';
import {
  Band,
  DeviceScreen,
  Heading,
  Icon,
  Lead,
  Name,
  PageTitle,
  RULE_TOP,
  RuledList,
  RuledRow,
  TextLink,
} from '@/components/sections';

// Qasa's page: the till itself, working, at full size; then what Qasa does,
// in the words the site already used for it.
export default function Qasa({ lang, t }) {
  const q = t.qasa;
  const c = t.jobs.chrispyPos;
  // The Kurdish page shows the English screen as the mirror; the other two
  // languages show the Kurdish one.
  const mirror = lang === 'ku' ? SHOTS.qasaSell : SHOTS.qasaSellKu;

  return (
    <>
      <Band rule={false} className="!pt-6 !pb-12">
        <TextLink href={pagePath(lang, 'projects')} className="mb-4">
          <Icon name="arrow" className="-scale-x-100 rtl:scale-x-100" />
          {t.projects.title}
        </TextLink>
        {/* A product name, so it stays in Latin in every language. */}
        <PageTitle>
          <span className="ltr-fixed">Qasa POS</span>
        </PageTitle>
        <p className="label mt-4 mb-0 !text-[0.95rem] text-chalk rtl:!text-[1.05rem]">{q.role}</p>
        <Lead className="mt-5">{q.lead}</Lead>
        <div className="mt-10 sm:mt-14">
          {/* The page's title is the h1, so the till's own headings are one
              level higher than on the home page, where it sits under an h2. */}
          <Till lang={lang} t={t} requestHref="#request" headingLevel={2} />
        </div>
      </Band>

      <Band>
        <RuledList>
          {q.facts.map(([label, value, machine]) => (
            <RuledRow key={label} term={label}>
              <span className={machine ? 'ltr-fixed text-chalk' : 'text-chalk'}>{value}</span>
            </RuledRow>
          ))}
        </RuledList>
      </Band>

      <Band>
        <Heading>{q.money.heading}</Heading>
        <RuledList className="mt-6">
          {q.money.rows.map(([term, text]) => (
            <RuledRow key={term} term={term}>
              {text}
            </RuledRow>
          ))}
        </RuledList>
      </Band>

      <Band>
        <div className="grid items-center gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <DeviceScreen src={mirror.src} width={mirror.width} height={mirror.height} alt={q.rtl.alt} />
          <div>
            <Heading>{q.rtl.heading}</Heading>
            <p className="m-0 mt-5 max-w-[46ch] text-[1.05rem] text-chalk-dim">{q.rtl.text}</p>
          </div>
        </div>
      </Band>

      <Band>
        <Heading>{q.inside.heading}</Heading>
        <DeviceScreen
          className="on-grid mt-6"
          src={SHOTS.qasaReports.src}
          width={SHOTS.qasaReports.width}
          height={SHOTS.qasaReports.height}
          alt={q.inside.alt}
          caption={q.inside.caption}
        />
        <RuledList className="mt-12">
          {q.inside.rows.map(([term, text]) => (
            <RuledRow key={term} term={term}>
              {text}
            </RuledRow>
          ))}
        </RuledList>
      </Band>

      <Band>
        <Heading>{q.client}</Heading>
        <div className="mt-6 max-w-[60ch] border-t border-mat-line pt-5">
          <h3 className="display wd-wide m-0 text-[1.3rem] leading-snug font-extrabold rtl:leading-[1.6]">
            <Name>{c.name}</Name>
          </h3>
          <p className="m-0 mt-1 font-semibold">{c.job}</p>
          <p className="m-0 mt-2 text-chalk-dim">{c.done}</p>
        </div>
      </Band>

      <div className={RULE_TOP}>
        <RequestBuilder t={t.ticket} r={t.request} />
      </div>
    </>
  );
}
