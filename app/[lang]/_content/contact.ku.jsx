import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site-data';
import {
  Button,
  ButtonRow,
  Card,
  ContactList,
  ContactRow,
  PageHeader,
  Reveal,
  Section,
} from '@/components/sections';

export default function ContactKu() {
  return (
    <>
      <PageHeader>پەیوەندی</PageHeader>
      <Section>
        <Reveal as="div">
          <Card className="max-w-[520px]">
            <p className="mb-5">
              ئامادەم بۆ یارمەتیدان لە بنیاتنان، چاککردنەوە یان شیکردنەوەی کێشەی پڕۆژەی داهاتووت.
            </p>
            <p className="mb-5">کراوەم بۆ دەرفەتی ڕاهێنان، کاری ئازاد و هاوکاری.</p>
            <ButtonRow className="mb-6">
              <Button href={`mailto:${EMAIL}`}>ئیمەیلم بۆ بنێرە</Button>
              <Button href={PHONE_HREF} tone="ghost">
                پەیوەندیم پێوە بکە
              </Button>
            </ButtonRow>
            <ContactList>
              <ContactRow label="ئیمەیل" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </ContactRow>
              <ContactRow label="تەلەفۆن" href={PHONE_HREF}>
                {PHONE_DISPLAY}
              </ContactRow>
            </ContactList>
          </Card>
        </Reveal>
      </Section>
    </>
  );
}
