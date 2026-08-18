import { NAME } from '../../../lib/site-data';
import Typewriter from '../../../components/Typewriter';
import {
  Button,
  ButtonRow,
  CtaRow,
  Prompt,
  Role,
  Section,
  SectionTitle,
  ServiceCard,
  ServicesGrid,
  Tagline,
} from '../../../components/sections';

export default function IndexAr() {
  return (
    <>
      <Section id="hero">
        {/* `whoami` is a shell command and the name is a name — both stay as
            they are in every language. */}
        <Prompt>
          <Typewriter text="whoami" />
        </Prompt>
        <h1 className="ltr-fixed">
          <Typewriter text={NAME} delay={250} caret />
        </h1>
        <Role>طالب هندسة حاسوب — برمجيات وعتاد</Role>
        <Tagline>طالب هندسة حاسوب بخبرة عملية في تطوير البرمجيات وأنظمة العتاد.</Tagline>
        <ButtonRow>
          <Button href="/ar/projects/">عرض المشاريع</Button>
          <Button href="/ar/contact/" tone="ghost">
            تواصل معي
          </Button>
        </ButtonRow>
      </Section>

      <Section id="services">
        <SectionTitle>الخدمات</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="تطوير المواقع">
            تصميم وتطوير مواقع إلكترونية، بما فيها مواقع متعددة اللغات تدعم العربية والكردية.
          </ServiceCard>
          <ServiceCard title="صيانة العتاد وإصلاحه">
            تشخيص أعطال العتاد وحلّها، بما في ذلك تبديل القطع وصيانة الأجهزة.
          </ServiceCard>
          <ServiceCard title="إعداد الشبكات">
            بناء شبكات محلية للمكاتب، بما في ذلك ربط الطابعات والأجهزة المشتركة بين عدة حواسيب.
          </ServiceCard>
        </ServicesGrid>
        <CtaRow text="مهتم بالعمل معًا؟ تواصل معي.">
          <Button href="/ar/contact/">تواصل معي</Button>
        </CtaRow>
      </Section>
    </>
  );
}
