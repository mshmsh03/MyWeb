import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '@/lib/site-data';
import RequestBuilder from '@/components/RequestBuilder';
import { Band, Heading, Lead, PageTitle, RuledList, RuledRow, TextLink } from '@/components/sections';

// Contact: the request builder at full size, then the direct lines and what
// to put in a message.

// Each side spans the heading row and the list's rows of the outer grid.
// Rows that face each other start their text at the same height.
const SIDE = 'lg:row-span-(--rows) lg:grid lg:grid-rows-subgrid';
const LIST = 'mt-6 lg:row-span-(--list) lg:grid lg:grid-rows-subgrid lg:[&>div]:content-start';

export default function Contact({ t }) {
  const c = t.contact;
  // The direct lines are email, phone and WhatsApp.
  const rows = Math.max(3, c.send.rows.length);
  return (
    <>
      <Band rule={false} className="sm:!pt-18 !pb-0">
        <PageTitle>{c.title}</PageTitle>
        <Lead className="mt-5">
          {c.lead} {c.open}
        </Lead>
      </Band>

      <RequestBuilder t={t.ticket} r={t.request} />

      {/* Two lists side by side from 1024px. Their rows share the rows of
          one grid (subgrid), so each rule runs straight across both. */}
      <Band>
        <div
          className="grid items-start gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-y-0"
          style={{ '--rows': rows + 1, '--list': rows }}
        >
          <div className={SIDE}>
            <Heading>{c.direct}</Heading>
            <RuledList contained={false} className={LIST}>
              <RuledRow term={c.email}>
                <TextLink href={`mailto:${EMAIL}`} className="text-chalk">
                  <span className="ltr-fixed break-all">{EMAIL}</span>
                </TextLink>
              </RuledRow>
              <RuledRow term={c.phone}>
                <TextLink href={PHONE_HREF} className="text-chalk">
                  <span className="ltr-fixed">{PHONE_DISPLAY}</span>
                </TextLink>
              </RuledRow>
              <RuledRow term={c.whatsapp}>
                <TextLink href={WHATSAPP_HREF} className="text-chalk">
                  <span className="ltr-fixed">{PHONE_DISPLAY}</span>
                </TextLink>
              </RuledRow>
            </RuledList>
          </div>
          <div className={SIDE}>
            <Heading>{c.send.heading}</Heading>
            <RuledList contained={false} className={LIST}>
              {c.send.rows.map(([term, text]) => (
                <RuledRow key={term} term={term}>
                  {text}
                </RuledRow>
              ))}
            </RuledList>
          </div>
        </div>
      </Band>
    </>
  );
}
