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
const LANG = 'ku';

export default function IndexKu() {
  return (
    <>
      <Section id="hero">
        <Hero
          aside={
            <StatusPanel>
              <StatusRow label="studying">ئەندازیاری کۆمپیوتەر، زانکۆی نێودەوڵەتی تیشک</StatusRow>
              <StatusRow label="works in">ئینگلیزی · عەرەبی · کوردی</StatusRow>
              <StatusRow label="open to">ڕاهێنان · کاری ئازاد · هاوکاری</StatusRow>
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
          <Role>خوێندکاری ئەندازیاری کۆمپیوتەر — نەرمەکاڵا و ڕەقەکاڵا</Role>
          <Tagline>
            ماڵپەڕ بە ئینگلیزی، عەرەبی و کوردی دروست دەکەم و بڵاوی دەکەمەوە، سیستەمی خاڵی فرۆشتن (POS) بۆ دوکانەکان
            دروست دەکەم، و کێشەی ڕەقەکاڵا دەستنیشان دەکەم و چاکی دەکەمەوە.
          </Tagline>
          <ButtonRow>
            <Button href={pagePath(LANG, 'projects')}>پڕۆژەکان ببینە</Button>
            <Button href={pagePath(LANG, 'contact')} tone="ghost">
              پەیوەندیم پێوە بکە
            </Button>
          </ButtonRow>
        </Hero>
      </Section>

      <Section id="websites">
        <SectionTitle>ماڵپەڕی کڕیاران</SectionTitle>
        <SiteGrid>
          <SiteCard
            href="https://www.ellincompany.com"
            shot={SHOTS.ellin}
            alt="پەڕەی سەرەکیی ماڵپەڕی کۆمپانیای ئێلین"
            title="کۆمپانیای ئێلین"
            domain="www.ellincompany.com"
          >
            ماڵپەڕی کۆمپانیایەکی بیناسازی بە ئینگلیزی، عەرەبی و کوردی، لەگەڵ دروستکردن، بڵاوکردنەوە و هۆستکردنی
            تەواو.
          </SiteCard>
          <SiteCard
            href="https://brightvolition.com"
            shot={SHOTS.brightVolition}
            alt="پەڕەی سەرەکیی ماڵپەڕی برایت ڤۆلیشن"
            title="برایت ڤۆلیشن"
            domain="brightvolition.com"
          >
            ماڵپەڕی کۆمپانیایەکی دابینکردنی پیشەسازی و خزمەتگوزاریی ئەندازیاری بە ئینگلیزی، عەرەبی و کوردی.
            سەرلەنوێ دروست کرایەوە و گوازرایەوە بۆ هۆستێکی نوێ، بەبێ ئەوەی هیچ بەستەرێکی کۆن لەکار بکەوێت.
          </SiteCard>
        </SiteGrid>
      </Section>

      <Section id="work">
        <SectionTitle>کاری تر</SectionTitle>
        <WorkList>
          <WorkRow title="Qasa POS" href={pagePath(LANG, 'projects/qasa')} more="زیاتر بخوێنەوە">
            سیستەمێکی نموونەیی فرۆشتن کە پیشانی دەدات چ جۆرە سیستەمێک دەتوانم بۆ دوکانێک دروست بکەم: فرۆشتن، کۆگا
            و ڕاپۆرت بە کوردی، عەرەبی و ئینگلیزی.
          </WorkRow>
          <WorkRow title="Chrispy POS">
            وەشانێکی Qasa کە تایبەت بۆ کیۆسکێکی خواردنی خێرا دروست کراوە، بە مێنیو، زیادکراوە و پسوولەی
            چێشتخانەی خۆیەوە.
          </WorkRow>
          <WorkRow title="Krofi — براند و مێنیو">
            لۆگۆ، ڕەنگ، فۆنت و مێنیویەکی چاپکراو بە کوردی و ئینگلیزی بۆ کیۆسکێکی شیرینی.
          </WorkRow>
          <WorkRow title="ئێلین — کارتی بازرگانی">
            کارتی دووڕوو بە عەرەبی، کوردی و ئینگلیزی، وەک فایلی ئامادە بۆ چاپخانە ڕادەست کراوە.
          </WorkRow>
        </WorkList>
        <ButtonRow className="mt-6">
          <Button href={pagePath(LANG, 'projects')} tone="ghost">
            هەموو پڕۆژەکان
          </Button>
        </ButtonRow>
      </Section>

      <Section id="services">
        <SectionTitle>خزمەتگوزاریەکان</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="دروستکردنی ماڵپەڕ">
            دیزاین و دروستکردنی ماڵپەڕ، لەوانە ماڵپەڕی فرەزمان کە پشتگیری عەرەبی و کوردی دەکات.
          </ServiceCard>
          <ServiceCard title="سیستەمی خاڵی فرۆشتن (POS)">
            سیستەمێکی فرۆشتن کە بەپێی دوکان، کیۆسک یان چێشتخانەکەت دروست دەکرێت، بە کوردی، عەرەبی و ئینگلیزی.
            بەبێ ئینتەرنێت کار دەکات.
          </ServiceCard>
          <ServiceCard title="پاراستن و چاککردنەوەی ڕەقەکاڵا">
            دەستنیشانکردن و چارەسەرکردنی کێشەی ڕەقەکاڵا، لەوانە گۆڕینی پارچە و پاراستنی ئامێرەکان.
          </ServiceCard>
        </ServicesGrid>
        <CtaRow text="حەز دەکەیت پێکەوە کار بکەین؟ پەیوەندیم پێوە بکە.">
          <ButtonRow>
            <Button href={`mailto:${EMAIL}`}>ئیمەیلم بۆ بنێرە</Button>
            <Button href={PHONE_HREF} tone="ghost">
              تەلەفۆنم بۆ بکە
            </Button>
            <Button href={WHATSAPP_HREF} tone="ghost">
              واتساپ
            </Button>
          </ButtonRow>
        </CtaRow>
      </Section>
    </>
  );
}
