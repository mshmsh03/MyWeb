import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '../../../lib/site-data';
import {
  Button,
  ButtonRow,
  Card,
  ContactList,
  ContactRow,
  PageHeader,
  Reveal,
  Section,
} from '../../../components/sections';

export default function ContactEn() {
  return (
    <>
      <PageHeader>Contact</PageHeader>
      <Section>
        <Reveal as="div">
          <Card className="max-w-[520px]">
            <p className="mb-5">
              Available to help with building, repairing, or troubleshooting your next project.
            </p>
            <p className="mb-5">Open to internship opportunities, freelance work, and collaboration.</p>
            <ButtonRow className="mb-6">
              <Button href={`mailto:${EMAIL}`}>Email Me</Button>
              <Button href={PHONE_HREF} tone="ghost">
                Call Me
              </Button>
            </ButtonRow>
            <ContactList>
              <ContactRow label="email" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </ContactRow>
              <ContactRow label="phone" href={PHONE_HREF}>
                {PHONE_DISPLAY}
              </ContactRow>
            </ContactList>
          </Card>
        </Reveal>
      </Section>
    </>
  );
}
