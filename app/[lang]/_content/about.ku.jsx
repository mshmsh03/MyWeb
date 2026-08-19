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
const LANG = 'ku';

export default function AboutKu() {
  return (
    <>
      <PageHeader>دەربارەم</PageHeader>
      <Section>
        <AboutList>
          <AboutItem note="currently">
            خوێندکاری ئەندازیاری کۆمپیوتەرم لە زانکۆی نێودەوڵەتی تیشک، هەولێر.
          </AboutItem>
          <AboutItem note="what I do">
            ئەزموونم لە نەرمەکاڵا و ڕەقەکاڵادا هەیە: دروستکردن و بڵاوکردنەوەی ماڵپەڕ، دەستنیشانکردن و
            چاککردنەوەی ڕەقەکاڵا، و دامەزراندنی تۆڕی ناوخۆیی بۆ ئامێرە هاوبەشەکانی ئۆفیس.
          </AboutItem>
          <AboutItem note="why">
            هاندەرم تێگەیشتنە لە سیستەمەکان بە تەواوی — لە کۆدی ماڵپەڕەوە تا ناوەوەی ڕەقەکاڵا — و
            چارەسەرکردنی کێشەی کردەیی و ڕاستەقینە.
          </AboutItem>
        </AboutList>
        <CtaRow text="حەز دەکەیت پێکەوە کار بکەین؟ پەیوەندیم پێوە بکە.">
          <Button href={pagePath(LANG, 'contact')}>پەیوەندیم پێوە بکە</Button>
        </CtaRow>
      </Section>
    </>
  );
}
