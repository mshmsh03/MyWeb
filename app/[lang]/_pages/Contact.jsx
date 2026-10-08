import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '@/lib/site-data';
import JobTicket from '@/components/JobTicket';
import {
  Band,
  Field,
  Fields,
  Heading,
  Lead,
  PageTitle,
  RuledList,
  RuledRow,
  Sheet,
  TextLink,
} from '@/components/sections';

export default function Contact({ t }) {
  const c = t.contact;
  return (
    <>
      <Band className="!pb-8">
        <PageTitle>{c.title}</PageTitle>
        <Lead className="mb-8">
          {c.lead} {c.open}
        </Lead>
        <JobTicket t={t.ticket} />
      </Band>

      <Band>
        <div className="grid items-start gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div>
            <Heading>{c.direct}</Heading>
            <Sheet className="px-5 py-2 sm:px-7">
              <Fields className="border-t-0 [&>div:last-child]:border-b-0">
                <Field label={c.email}>
                  <TextLink href={`mailto:${EMAIL}`}>
                    <span className="ltr-fixed break-all">{EMAIL}</span>
                  </TextLink>
                </Field>
                <Field label={c.phone}>
                  <TextLink href={PHONE_HREF}>
                    <span className="ltr-fixed">{PHONE_DISPLAY}</span>
                  </TextLink>
                </Field>
                <Field label={c.whatsapp}>
                  <TextLink href={WHATSAPP_HREF}>
                    <span className="ltr-fixed">{PHONE_DISPLAY}</span>
                  </TextLink>
                </Field>
              </Fields>
            </Sheet>
          </div>
          <div>
            <Heading>{c.send.heading}</Heading>
            <RuledList>
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
