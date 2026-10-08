import { EMAIL, NAME, PHONE_HREF, SHOTS, WHATSAPP_HREF, pagePath } from '@/lib/site-data';
import Typewriter from '@/components/Typewriter';
import {
  Button,
  ButtonRow,
  CtaRow,
  Hero,
  Prompt,
  Role,
  Section,
  SectionTitle,
  ServiceCard,
  ServicesGrid,
  SiteCard,
  SiteGrid,
  StatusPanel,
  StatusRow,
  Tagline,
  WorkList,
  WorkRow,
} from '@/components/sections';

// The route shape (which segments, where the trailing slash goes) is
// pagePath's business, not the copy's — this file only says *which* page.
const LANG = 'ar';

export default function IndexAr() {
  return (
    <>
      <Section id="hero">
        <Hero
          aside={
            <StatusPanel>
              <StatusRow label="studying">هندسة الحاسوب، جامعة تيشك الدولية</StatusRow>
              <StatusRow label="works in">الإنجليزية · العربية · الكردية</StatusRow>
              <StatusRow label="open to">التدريب · العمل الحر · التعاون</StatusRow>
            </StatusPanel>
          }
        >
          {/* `whoami` is a shell command and the name is a name — both stay as
              they are in every language. */}
          <Prompt>
            <Typewriter text="whoami" />
          </Prompt>
          <h1 className="ltr-fixed">
            <Typewriter text={NAME} delay={250} caret />
          </h1>
          <Role>طالب هندسة حاسوب — برمجيات وعتاد</Role>
          <Tagline>
            أبني المواقع وأنشرها بالإنجليزية والعربية والكردية، وأبني أنظمة نقاط البيع للمتاجر، وأشخّص أعطال العتاد
            وأصلحها.
          </Tagline>
          <ButtonRow>
            <Button href={pagePath(LANG, 'projects')}>عرض المشاريع</Button>
            <Button href={pagePath(LANG, 'contact')} tone="ghost">
              تواصل معي
            </Button>
          </ButtonRow>
        </Hero>
      </Section>

      <Section id="websites">
        <SectionTitle>مواقع العملاء</SectionTitle>
        <SiteGrid>
          <SiteCard
            href="https://www.ellincompany.com"
            shot={SHOTS.ellin}
            alt="الصفحة الرئيسية لموقع شركة إيلين"
            title="شركة إيلين"
            domain="www.ellincompany.com"
          >
            موقع شركة إنشاءات بالإنجليزية والعربية والكردية، مع البناء والنشر والاستضافة كاملةً.
          </SiteCard>
          <SiteCard
            href="https://brightvolition.com"
            shot={SHOTS.brightVolition}
            alt="الصفحة الرئيسية لموقع برايت فوليشن"
            title="برايت فوليشن"
            domain="brightvolition.com"
          >
            موقع شركة للتوريدات الصناعية والخدمات الهندسية بالإنجليزية والعربية والكردية. أُعيد بناؤه ونُقل إلى
            استضافة جديدة مع بقاء جميع الروابط القديمة تعمل.
          </SiteCard>
        </SiteGrid>
      </Section>

      <Section id="work">
        <SectionTitle>أعمال أخرى</SectionTitle>
        <WorkList>
          <WorkRow title="Qasa POS" href={pagePath(LANG, 'projects/qasa')} more="اقرأ المزيد">
            نظام نقطة بيع نموذجي يبيّن نوع الأنظمة التي أستطيع بناءها للمتاجر: المبيعات والمخزون والتقارير
            بالكردية والعربية والإنجليزية.
          </WorkRow>
          <WorkRow title="Chrispy POS">
            نسخة من Qasa بُنيت خصيصًا لكشك مأكولات سريعة، بقائمته وإضافاته وتذاكر المطبخ.
          </WorkRow>
          <WorkRow title="Krofi — الهوية وقائمة الطعام">
            شعار وألوان وخطوط وقائمة مطبوعة بالكردية والإنجليزية لكشك حلويات.
          </WorkRow>
          <WorkRow title="إيلين — بطاقة العمل">
            بطاقات بوجهين بالعربية والكردية والإنجليزية، سُلّمت ملفات جاهزة للمطبعة.
          </WorkRow>
        </WorkList>
        <ButtonRow className="mt-6">
          <Button href={pagePath(LANG, 'projects')} tone="ghost">
            كل المشاريع
          </Button>
        </ButtonRow>
      </Section>

      <Section id="services">
        <SectionTitle>الخدمات</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="تطوير المواقع">
            تصميم وتطوير مواقع إلكترونية، بما فيها مواقع متعددة اللغات تدعم العربية والكردية.
          </ServiceCard>
          <ServiceCard title="أنظمة نقاط البيع">
            نظام بيع يُبنى حول متجرك أو كشكك أو مطعمك، بالكردية والعربية والإنجليزية، ويعمل دون إنترنت.
          </ServiceCard>
          <ServiceCard title="صيانة العتاد وإصلاحه">
            تشخيص أعطال العتاد وحلّها، بما في ذلك تبديل القطع وصيانة الأجهزة.
          </ServiceCard>
        </ServicesGrid>
        <CtaRow text="مهتم بالعمل معًا؟ تواصل معي.">
          <ButtonRow>
            <Button href={`mailto:${EMAIL}`}>راسلني</Button>
            <Button href={PHONE_HREF} tone="ghost">
              اتصل بي
            </Button>
            <Button href={WHATSAPP_HREF} tone="ghost">
              واتساب
            </Button>
          </ButtonRow>
        </CtaRow>
      </Section>
    </>
  );
}
