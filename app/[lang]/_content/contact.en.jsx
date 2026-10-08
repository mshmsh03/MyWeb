import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '@/lib/site-data';
import {
  Button,
  ButtonRow,
  Card,
  ContactList,
  ContactRow,
  PageHeader,
  Section,
  SectionTitle,
  SpecList,
  SpecRow,
  Split,
} from '@/components/sections';

export default function ContactEn() {
  return (
    <>
      <PageHeader>Contact</PageHeader>
      <Section>
        <Split
          top
          media={
            <Card>
              <p className="mb-5">
                Available to help with building, repairing, or troubleshooting your next project.
              </p>
              <p className="mb-5">Open to internship opportunities, freelance work, and collaboration.</p>
              <ButtonRow className="mb-6">
                <Button href={`mailto:${EMAIL}`}>Email Me</Button>
                <Button href={PHONE_HREF} tone="ghost">
                  Call Me
                </Button>
                <Button href={WHATSAPP_HREF} tone="ghost">
                  WhatsApp
                </Button>
              </ButtonRow>
              <ContactList>
                <ContactRow label="email" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </ContactRow>
                <ContactRow label="phone" href={PHONE_HREF}>
                  {PHONE_DISPLAY}
                </ContactRow>
                <ContactRow label="whatsapp" href={WHATSAPP_HREF}>
                  {PHONE_DISPLAY}
                </ContactRow>
              </ContactList>
            </Card>
          }
        >
          <SectionTitle>What to send</SectionTitle>
          <SpecList>
            <SpecRow term="Website">
              What the business does, which languages it needs, and when it should be live.
            </SpecRow>
            <SpecRow term="POS system">
              What you sell, how many counters you have, and which receipt printer you use.
            </SpecRow>
            <SpecRow term="Repair">The device and model, what it does or does not do, and when it started.</SpecRow>
          </SpecList>
        </Split>
      </Section>
    </>
  );
}
