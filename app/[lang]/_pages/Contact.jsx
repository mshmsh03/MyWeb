import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '@/lib/site-data';
import RequestBuilder from '@/components/RequestBuilder';
import { Band, Heading, Lead, PageTitle, RuledList, RuledRow, TextLink } from '@/components/sections';

// Contact: the request builder at full size, then the direct lines and what
// to put in a message.
export default function Contact({ t }) {
  const c = t.contact;
  return (
    <>
      <Band rule={false} className="!pb-0">
        <PageTitle>{c.title}</PageTitle>
        <Lead className="mt-5">
          {c.lead} {c.open}
        </Lead>
      </Band>

      <RequestBuilder t={t.ticket} r={t.request} />

      <Band>
        <div className="grid items-start gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <Heading>{c.direct}</Heading>
            <RuledList className="mt-8">
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
          <div>
            <Heading>{c.send.heading}</Heading>
            <RuledList className="mt-8">
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
