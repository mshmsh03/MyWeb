import { pagePath } from '@/lib/site-data';
import {
  AboutItem,
  AboutList,
  Button,
  CtaRow,
  PageHeader,
  Section,
} from '@/components/sections';

// The route shape (which segments, where the trailing slash goes) is
// pagePath's business, not the copy's — this file only says *which* page.
const LANG = 'ar';

export default function AboutAr() {
  return (
    <>
      <PageHeader>نبذة عني</PageHeader>
      <Section>
        <AboutList>
          <AboutItem note="currently">طالب هندسة حاسوب في جامعة تيشك الدولية، أربيل.</AboutItem>
          <AboutItem note="what I do">
            خبرة في البرمجيات والعتاد معًا: تطوير المواقع ونشرها، أنظمة نقاط البيع، وتشخيص العتاد وإصلاحه (بما
            في ذلك استبدال القطع).
          </AboutItem>
          <AboutItem note="why">
            يدفعني فهم الأنظمة من طرفها إلى طرفها — من شيفرة الموقع إلى مكونات العتاد — وحلّ مشكلات عملية
            واقعية.
          </AboutItem>
          <AboutItem note="languages">الإنجليزية والعربية والكردية.</AboutItem>
        </AboutList>
        <CtaRow text="مهتم بالعمل معًا؟ تواصل معي.">
          <Button href={pagePath(LANG, 'contact')}>تواصل معي</Button>
        </CtaRow>
      </Section>
    </>
  );
}
