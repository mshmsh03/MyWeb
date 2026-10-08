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
const LANG = 'ar';

export default function ProjectsAr() {
  return (
    <>
      <PageHeader>المشاريع</PageHeader>
      <Section>
        <Lead>مواقع إلكترونية وأنظمة نقاط بيع ومطبوعات أُنجزت لشركات ومتاجر حقيقية.</Lead>

        <WorkGroup title="المواقع">
          <SiteGrid>
            <SiteCard
              href="https://www.ellincompany.com"
              shot={SHOTS.ellin}
              alt="الصفحة الرئيسية لموقع شركة إيلين"
              title="شركة إيلين"
              domain="www.ellincompany.com"
            >
              موقع ثلاثي اللغة لشركة إنشاءات. التصميم والبناء والنشر والاستضافة.
            </SiteCard>
            <SiteCard
              href="https://brightvolition.com"
              shot={SHOTS.brightVolition}
              alt="الصفحة الرئيسية لموقع برايت فوليشن"
              title="برايت فوليشن"
              domain="brightvolition.com"
            >
              موقع ثلاثي اللغة لشركة توريدات صناعية وخدمات هندسية. أُعيد بناؤه ثم نُقل إلى استضافة جديدة مع
              تحويل جميع الروابط القديمة.
            </SiteCard>
          </SiteGrid>
          <WorkList>
            <WorkRow title="Chrispy — موقع قائمة الطعام">
              قائمة طعام من صفحة واحدة لرابط إنستغرام الخاص بكشك مأكولات سريعة، بالكردية والإنجليزية، مع أداة
              تحسب قيمة الطلب مع كل نقرة.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <WorkGroup title="البرمجيات">
          <SiteGrid>
            <SiteCard
              wide
              href={pagePath(LANG, 'projects/qasa')}
              shot={SHOTS.qasaSell}
              alt="شاشة البيع في نظام نقطة البيع Qasa"
              title="Qasa POS"
              more="اقرأ المزيد"
            >
              نظام نقطة بيع نموذجي يبيّن ما أستطيع بناءه للمتاجر: المبيعات والمخزون والورديات والتقارير بالكردية
              والعربية والإنجليزية، ويعمل دون إنترنت. يحصل كل عميل على نسخة تُبنى حول عمله.
            </SiteCard>
          </SiteGrid>
          <WorkList>
            <WorkRow title="Chrispy POS">
              نسخة من Qasa بُنيت حول كشك مأكولات سريعة: قائمته وإضافاته وتذاكر المطبخ ودرج النقود والتقارير
              اليومية.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <WorkGroup title="المطبوعات">
          <WorkList>
            <WorkRow title="Krofi — الهوية وقائمة الطعام">
              شعار وألوان وخطوط كردية وإنجليزية ونماذج للمنتجات وقائمة مطبوعة لكشك حلويات.
            </WorkRow>
            <WorkRow title="Chrispy — قائمة الطعام المطبوعة">
              أربع صفحات A4 بالإنجليزية والكردية، والصفحات الكردية مصمَّمة كانعكاس كامل من اليمين إلى اليسار.
            </WorkRow>
            <WorkRow title="شركة إيلين — بطاقة العمل">
              بطاقات بوجهين بالعربية والكردية والإنجليزية، سُلّمت ملفات جاهزة للمطبعة.
            </WorkRow>
            <WorkRow title="شركة إيلين — الملف التعريفي">
              تصميم ملف تعريفي لشركة إنشاءات، أُنجز باستخدام Canva.
            </WorkRow>
            <WorkRow title="برايت فوليشن — الملف التعريفي">
              ملف تعريفي من 24 صفحة بالإنجليزية، مع نسخة عربية أُعيد بناؤها صفحةً صفحة كانعكاس من اليمين إلى
              اليسار.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <div className="mt-14">
          <CtaRow text="مهتم بالعمل معًا؟ تواصل معي.">
            <Button href={pagePath(LANG, 'contact')}>تواصل معي</Button>
          </CtaRow>
        </div>
      </Section>
    </>
  );
}
