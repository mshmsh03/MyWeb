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

export default function ContactAr() {
  return (
    <>
      <PageHeader>تواصل</PageHeader>
      <Section>
        <Split
          top
          media={
            <Card>
              <p className="mb-5">متاح للمساعدة في بناء مشروعك القادم أو إصلاحه أو تشخيص أعطاله.</p>
              <p className="mb-5">منفتح على فرص التدريب والعمل الحر والتعاون.</p>
              <ButtonRow className="mb-6">
                <Button href={`mailto:${EMAIL}`}>راسلني</Button>
                <Button href={PHONE_HREF} tone="ghost">
                  اتصل بي
                </Button>
                <Button href={WHATSAPP_HREF} tone="ghost">
                  واتساب
                </Button>
              </ButtonRow>
              <ContactList>
                <ContactRow label="البريد" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </ContactRow>
                <ContactRow label="الهاتف" href={PHONE_HREF}>
                  {PHONE_DISPLAY}
                </ContactRow>
                <ContactRow label="واتساب" href={WHATSAPP_HREF}>
                  {PHONE_DISPLAY}
                </ContactRow>
              </ContactList>
            </Card>
          }
        >
          <SectionTitle>ماذا ترسل</SectionTitle>
          <SpecList>
            <SpecRow term="موقع">ما يقدّمه العمل، واللغات التي يحتاجها الموقع، وموعد إطلاقه.</SpecRow>
            <SpecRow term="نظام بيع">
              ما تبيعه، وعدد نقاط البيع لديك، ونوع طابعة الإيصالات التي تستخدمها.
            </SpecRow>
            <SpecRow term="إصلاح">نوع الجهاز وطرازه، وما الذي يفعله أو لا يفعله، ومتى بدأت المشكلة.</SpecRow>
          </SpecList>
        </Split>
      </Section>
    </>
  );
}
