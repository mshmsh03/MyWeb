import { SHOTS, pagePath } from '@/lib/site-data';
import {
  Button,
  CtaRow,
  Fact,
  FactList,
  Lead,
  Note,
  PathCrumb,
  Role,
  Section,
  SectionTitle,
  ServiceCard,
  ServicesGrid,
  Shot,
  SpecList,
  SpecRow,
  Split,
  WorkList,
  WorkRow,
} from '@/components/sections';

// The route shape (which segments, where the trailing slash goes) is
// pagePath's business, not the copy's — this file only says *which* page.
const LANG = 'ku';

export default function QasaKu() {
  return (
    <>
      <Section>
        <PathCrumb href={pagePath(LANG, 'projects')} parent="projects" leaf="qasa" />
        {/* A product name, so it stays in Latin and mono in every language. */}
        <h1 className="ltr-fixed m-fade">Qasa POS</h1>
        <Role>سیستەمێکی نموونەیی خاڵی فرۆشتن</Role>
        <Lead>
          Qasa سیستەمێکی نموونەیی فرۆشتنە کە دروستم کردووە بۆ ئەوەی پیشان بدەم چی دەتوانم بۆ کارێک دروست بکەم.
          لەسەر کۆمپیوتەری دوکانەکە خۆی کار دەکات، بە کوردی، عەرەبی و ئینگلیزی، و پێویستی بە ئینتەرنێت یان هەژمار
          نییە. بۆ هەر کڕیارێک وەشانێکی لێ دروست دەکەم کە لەگەڵ شێوازی فرۆشتنەکەی بگونجێت.
        </Lead>
        <FactList>
          <Fact label="کار دەکات لەسەر">
            <span className="ltr-fixed">Windows · Linux · macOS</span>
          </Fact>
          <Fact label="زمانەکان">کوردی · عەرەبی · ئینگلیزی</Fact>
          <Fact label="گونجاوە بۆ">دوکان · چێشتخانە · کیۆسک</Fact>
          <Fact label="تاقیکراوەتەوە بە">112 تاقیکردنەوەی خۆکار</Fact>
        </FactList>
        <Shot
          shot={SHOTS.qasaSellKu}
          alt="شاشەی فرۆشتنی Qasa بە کوردی: خانەی کاڵاکان لە لای ڕاست، و داواکارییەکە وەک پسوولەیەکی کاغەز لە لای چەپ"
          caption="شاشەی فرۆشتن. داواکارییەکە لە لای چەپ وەک ئەو پسوولەیە کێشراوە کە چاپ دەکرێت."
        />
      </Section>

      <Section>
        <SectionTitle>دروستکراوە بۆ ئەو شێوەیەی دوکانەکانی ئێرە پارە وەردەگرن</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="دینار، خڕکراوە وەک پارەی کاش">
            کۆی گشتی خڕ دەکرێتەوە بۆ نزیکترین 250 دینار، بۆیە ئەو بڕەی لەسەر شاشەکەیە بڕێکە کە کڕیار بەڕاستی
            دەتوانێت بیدات.
          </ServiceCard>
          <ServiceCard title="دۆلار بە نرخی دوکانەکە خۆی">
            کڕیار دەتوانێت بە دۆلار پارە بدات بەو نرخەی دوکانەکە دایدەنێت، و باقییەکەی بە دینار دەدرێتەوە.
          </ServiceCard>
          <ServiceCard title="هەژماری قەرزی کڕیاران">
            فرۆشتن دەتوانرێت بخرێتە سەر هەژماری کڕیار، و دوکانەکە دەبینێت کێ چەندی قەرزارە.
          </ServiceCard>
          <ServiceCard title="پسوولە کە کوردی بە دروستی چاپ دەکات">
            پسوولەکان پێش چاپکردن وەک وێنە دەکێشرێن، بۆیە کوردی و عەرەبی لەسەر پرینتەری گەرمیی هەرزانیش بە
            دروستی دەردەچن.
          </ServiceCard>
        </ServicesGrid>
      </Section>

      <Section>
        <SectionTitle>لە ڕاستەوە بۆ چەپ</SectionTitle>
        <Split
          media={
            <Shot
              shot={SHOTS.qasaSell}
              alt="هەمان شاشەی فرۆشتن بە ئینگلیزی: ڕێنیشاندان لە لای چەپ و داواکارییەکە لە لای ڕاست"
            />
          }
        >
          <Note title="هەموو شاشەکە بۆ کوردی و عەرەبی هەڵدەگەڕێتەوە.">
            ئەمە هەمان شاشەیە بە ئینگلیزی: ڕێنیشاندان لە لای چەپە و داواکارییەکە لە لای ڕاست. نرخەکان لە هەموو
            زمانەکاندا بە هەمان ژمارە و هەمان فۆنت دەمێننەوە، بۆیە کاشێر بە هەمان شێوە دەیانخوێنێتەوە.
          </Note>
        </Split>
      </Section>

      <Section>
        <SectionTitle>چی تێدایە</SectionTitle>
        <Split
          top
          media={
            <Shot
              shot={SHOTS.qasaReports}
              alt="شاشەی ڕاپۆرتەکانی Qasa: کۆی فرۆشتن، هێڵکاریی فرۆشتن بەپێی کاتژمێر، و زۆرترین فرۆشراوەکان"
              caption="ڕاپۆرتەکان، لەگەڵ هەناردەکردن بۆ Excel."
            />
          }
        >
          <SpecList>
            <SpecRow term="فرۆشتن">
              خانەی کاڵاکان، گەڕان، سکانەری بارکۆد، قەبارەکان، داشکاندن، ڕاگرتن و گەڕاندنەوەی داواکاری.
            </SpecRow>
            <SpecRow term="پارەدان">
              کاش بە دینار یان دۆلار، کارت، جزدانی ئەلیکترۆنی، لەسەر هەژمار، یان دابەشکردن لە نێوانیاندا.
            </SpecRow>
            <SpecRow term="مێزەکان">
              داواکاریی کراوە بۆ هەر مێزێک، لێرە، بردن و گەیاندن، لەگەڵ پسوولەی چێشتخانە.
            </SpecRow>
            <SpecRow term="کۆگا">کاڵا و پۆلەکان، وەرگرتن، ژماردن، و ئاگادارکردنەوەی کەمبوونی کۆگا.</SpecRow>
            <SpecRow term="شەفتەکان">
              پارەی سەرەتا، هاتن و چوونی پارە لەگەڵ هۆکار، ژماردن و ڕاپۆرتی کۆتایی شەفت.
            </SpecRow>
            <SpecRow term="ڕاپۆرتەکان">
              فرۆشتن بەپێی کاتژمێر، کاڵا، پۆل، شێوازی پارەدان و کارمەند، لەگەڵ هەناردەکردن بۆ Excel.
            </SpecRow>
            <SpecRow term="کارمەندان">
              ڕۆڵی خاوەن، بەڕێوەبەر و کاشێر. پینی بەڕێوەبەر ڕەزامەندی لەسەر داشکاندن، هەڵوەشاندنەوە و
              گەڕاندنەوە دەدات.
            </SpecRow>
            <SpecRow term="پاراستن">
              باکئەپی ڕۆژانە لەگەڵ گەڕاندنەوە، قفڵبوونی خۆکار کاتێک قاسەکە بەجێ دەهێڵرێت، و وەستانێکی کاتی دوای
              چەند جار پینی هەڵە.
            </SpecRow>
          </SpecList>
        </Split>
      </Section>

      <Section>
        <SectionTitle>بۆ کڕیارێک دروست کراوە</SectionTitle>
        <WorkList>
          <WorkRow title="Chrispy POS">
            وەشانێکی Qasa کە بەپێی کیۆسکێکی خواردنی خێرا دروست کراوە: مێنیو و نرخەکانی، زیادکراوەکان، پسوولەی
            چێشتخانە، و براندی خۆی لەسەر هەموو شاشەیەک.
          </WorkRow>
        </WorkList>
        <div className="mt-10">
          <CtaRow text="دەتەوێت سیستەمێکی لەم جۆرە بۆ کارەکەت دروست بکرێت؟ پەیوەندیم پێوە بکە.">
            <Button href={pagePath(LANG, 'contact')}>پەیوەندیم پێوە بکە</Button>
          </CtaRow>
        </div>
      </Section>
    </>
  );
}
