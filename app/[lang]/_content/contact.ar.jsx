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

export default function ContactAr() {
  return (
    <>
      <PageHeader>تواصل</PageHeader>
      <Section>
        <Reveal as="div">
          <Card className="max-w-[520px]">
            <p className="mb-5">متاح للمساعدة في بناء مشروعك القادم أو إصلاحه أو تشخيص أعطاله.</p>
            <p className="mb-5">منفتح على فرص التدريب والعمل الحر والتعاون.</p>
            <ButtonRow className="mb-6">
              <Button href={`mailto:${EMAIL}`}>راسلني</Button>
              <Button href={PHONE_HREF} tone="ghost">
                اتصل بي
              </Button>
            </ButtonRow>
            <ContactList>
              <ContactRow label="البريد" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </ContactRow>
              <ContactRow label="الهاتف" href={PHONE_HREF}>
                {PHONE_DISPLAY}
              </ContactRow>
            </ContactList>
          </Card>
        </Reveal>
      </Section>
    </>
  );
}
