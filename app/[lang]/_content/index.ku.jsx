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

export default function IndexKu() {
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
        <Role>خوێندکاری ئەندازیاری کۆمپیوتەر — نەرمەکاڵا و ڕەقەکاڵا</Role>
        <Tagline>
          خوێندکاری ئەندازیاری کۆمپیوتەرم بە ئەزموونی کردەیی لە پەرەپێدانی نەرمەکاڵا و سیستەمی ڕەقەکاڵادا.
        </Tagline>
        <ButtonRow>
          <Button href="/ku/projects/">پڕۆژەکان ببینە</Button>
          <Button href="/ku/contact/" tone="ghost">
            پەیوەندیم پێوە بکە
          </Button>
        </ButtonRow>
      </Section>

      <Section id="services">
        <SectionTitle>خزمەتگوزاریەکان</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="دروستکردنی ماڵپەڕ">
            دیزاین و دروستکردنی ماڵپەڕ، لەوانە ماڵپەڕی فرەزمان کە پشتگیری عەرەبی و کوردی دەکات.
          </ServiceCard>
          <ServiceCard title="پاراستن و چاککردنەوەی ڕەقەکاڵا">
            دەستنیشانکردن و چارەسەرکردنی کێشەی ڕەقەکاڵا، لەوانە گۆڕینی پارچە و پاراستنی ئامێرەکان.
          </ServiceCard>
          <ServiceCard title="دامەزراندنی تۆڕ">
            بنیاتنانی تۆڕی ناوخۆیی بۆ ئۆفیس، لەوانە بەستنەوەی پرینتەر و ئامێری هاوبەش لە نێوان چەند
            کۆمپیوتەرێکدا.
          </ServiceCard>
        </ServicesGrid>
        <CtaRow text="حەز دەکەیت پێکەوە کار بکەین؟ پەیوەندیم پێوە بکە.">
          <Button href="/ku/contact/">پەیوەندیم پێوە بکە</Button>
        </CtaRow>
      </Section>
    </>
  );
}
