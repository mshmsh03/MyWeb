import {
  AboutItem,
  AboutList,
  Button,
  CtaRow,
  PageHeader,
  Section,
} from '../../../components/sections';

export default function AboutAr() {
  return (
    <>
      <PageHeader>نبذة عني</PageHeader>
      <Section>
        <AboutList>
          <AboutItem note="currently">طالب هندسة حاسوب في جامعة تيشك الدولية، أربيل.</AboutItem>
          <AboutItem note="what I do">
            خبرة في البرمجيات والعتاد معًا: تطوير المواقع ونشرها، تشخيص العتاد وإصلاحه، وإعداد شبكات محلية
            لأجهزة المكاتب المشتركة.
          </AboutItem>
          <AboutItem note="why">
            يدفعني فهم الأنظمة من طرفها إلى طرفها — من شيفرة الموقع إلى مكونات العتاد — وحلّ مشكلات عملية
            واقعية.
          </AboutItem>
        </AboutList>
        <CtaRow text="مهتم بالعمل معًا؟ تواصل معي.">
          <Button href="/ar/contact/">تواصل معي</Button>
        </CtaRow>
      </Section>
    </>
  );
}
