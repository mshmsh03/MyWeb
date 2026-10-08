import { SHOTS, pagePath } from '@/lib/site-data';
import {
  Button,
  CtaRow,
  Lead,
  PageHeader,
  Section,
  SiteCard,
  SiteGrid,
  WorkGroup,
  WorkList,
  WorkRow,
} from '@/components/sections';

// The route shape (which segments, where the trailing slash goes) is
// pagePath's business, not the copy's — this file only says *which* page.
const LANG = 'ku';

export default function ProjectsKu() {
  return (
    <>
      <PageHeader>پڕۆژەکان</PageHeader>
      <Section>
        <Lead>ماڵپەڕ، سیستەمی خاڵی فرۆشتن و کاری چاپکراو کە بۆ کۆمپانیا و دوکانی ڕاستەقینە دروست کراون.</Lead>

        <WorkGroup title="ماڵپەڕەکان">
          <SiteGrid>
            <SiteCard
              href="https://www.ellincompany.com"
              shot={SHOTS.ellin}
              alt="پەڕەی سەرەکیی ماڵپەڕی کۆمپانیای ئێلین"
              title="کۆمپانیای ئێلین"
              domain="www.ellincompany.com"
            >
              ماڵپەڕێکی سێزمان بۆ کۆمپانیایەکی بیناسازی. دیزاین، دروستکردن، بڵاوکردنەوە و هۆستکردن.
            </SiteCard>
            <SiteCard
              href="https://brightvolition.com"
              shot={SHOTS.brightVolition}
              alt="پەڕەی سەرەکیی ماڵپەڕی برایت ڤۆلیشن"
              title="برایت ڤۆلیشن"
              domain="brightvolition.com"
            >
              ماڵپەڕێکی سێزمان بۆ کۆمپانیایەکی دابینکردنی پیشەسازی و خزمەتگوزاریی ئەندازیاری. سەرلەنوێ دروست
              کرایەوە، پاشان گوازرایەوە بۆ هۆستێکی نوێ و هەموو بەستەرە کۆنەکان ئاڕاستە کرانەوە.
            </SiteCard>
          </SiteGrid>
          <WorkList>
            <WorkRow title="Chrispy — ماڵپەڕی مێنیو">
              مێنیویەکی یەک پەڕەیی بۆ بەستەری ئینستاگرامی کیۆسکێکی خواردنی خێرا، بە کوردی و ئینگلیزی، لەگەڵ
              ئامرازێک کە بە هەر کرتەیەک نرخی داواکارییەکە کۆ دەکاتەوە.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <WorkGroup title="نەرمەکاڵا">
          <SiteGrid>
            <SiteCard
              wide
              href={pagePath(LANG, 'projects/qasa')}
              shot={SHOTS.qasaSellKu}
              alt="شاشەی فرۆشتنی سیستەمی Qasa بە کوردی"
              title="Qasa POS"
              more="زیاتر بخوێنەوە"
            >
              سیستەمێکی نموونەیی فرۆشتن کە پیشانی دەدات چی دەتوانم بۆ دوکانێک دروست بکەم: فرۆشتن، کۆگا، شەفت و
              ڕاپۆرت بە کوردی، عەرەبی و ئینگلیزی، بەبێ ئینتەرنێت. هەر کڕیارێک وەشانێکی تایبەت بە کارەکەی خۆی
              وەردەگرێت.
            </SiteCard>
          </SiteGrid>
          <WorkList>
            <WorkRow title="Chrispy POS">
              وەشانێکی Qasa کە بەپێی کیۆسکێکی خواردنی خێرا دروست کراوە: مێنیو، زیادکراوەکان، پسوولەی چێشتخانە،
              چەکمەجەی پارە و ڕاپۆرتی ڕۆژانەی خۆی.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <WorkGroup title="چاپکراوەکان">
          <WorkList>
            <WorkRow title="Krofi — براند و مێنیو">
              لۆگۆ، ڕەنگ، فۆنتی کوردی و ئینگلیزی، مۆکئەپی بەرهەم و مێنیویەکی چاپکراو بۆ کیۆسکێکی شیرینی.
            </WorkRow>
            <WorkRow title="Chrispy — مێنیوی چاپکراو">
              چوار پەڕەی A4 بە ئینگلیزی و کوردی، پەڕە کوردییەکان بە تەواوی لە ڕاستەوە بۆ چەپ ڕێکخراون.
            </WorkRow>
            <WorkRow title="کۆمپانیای ئێلین — کارتی بازرگانی">
              کارتی دووڕوو بە عەرەبی، کوردی و ئینگلیزی، وەک فایلی ئامادە بۆ چاپخانە ڕادەست کراوە.
            </WorkRow>
            <WorkRow title="کۆمپانیای ئێلین — پرۆفایلی کۆمپانیا">
              دیزاینی پرۆفایلی کۆمپانیا بۆ فیرمێکی بیناسازی، بە Canva ئەنجام دراوە.
            </WorkRow>
            <WorkRow title="برایت ڤۆلیشن — پرۆفایلی کۆمپانیا">
              پرۆفایلێکی 24 پەڕەیی بە ئینگلیزی، لەگەڵ وەشانێکی عەرەبی کە پەڕە بە پەڕە لە ڕاستەوە بۆ چەپ دروست
              کراوەتەوە.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <div className="mt-14">
          <CtaRow text="حەز دەکەیت پێکەوە کار بکەین؟ پەیوەندیم پێوە بکە.">
            <Button href={pagePath(LANG, 'contact')}>پەیوەندیم پێوە بکە</Button>
          </CtaRow>
        </div>
      </Section>
    </>
  );
}
