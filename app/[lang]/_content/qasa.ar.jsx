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
const LANG = 'ar';

export default function QasaAr() {
  return (
    <>
      <Section>
        <PathCrumb href={pagePath(LANG, 'projects')} parent="projects" leaf="qasa" />
        {/* A product name, so it stays in Latin and mono in every language. */}
        <h1 className="ltr-fixed m-fade">Qasa POS</h1>
        <Role>نظام نقطة بيع نموذجي</Role>
        <Lead>
          Qasa نظام بيع نموذجي بنيته لأبيّن ما أستطيع تنفيذه لأي عمل تجاري. يعمل على حاسوب المتجر نفسه، بالكردية
          والعربية والإنجليزية، ولا يحتاج إلى إنترنت أو حساب. ولكل عميل أبني نسخة منه تناسب طريقة بيعه.
        </Lead>
        <FactList>
          <Fact label="يعمل على">
            <span className="ltr-fixed">Windows · Linux · macOS</span>
          </Fact>
          <Fact label="اللغات">الكردية · العربية · الإنجليزية</Fact>
          <Fact label="يناسب">المتاجر · المطاعم · الأكشاك</Fact>
          <Fact label="مُختبَر بـ">112 اختبارًا آليًا</Fact>
        </FactList>
        <Shot
          shot={SHOTS.qasaSell}
          alt="شاشة البيع في Qasa: شبكة منتجات على اليسار، والطلب مرسوم كإيصال ورقي على اليمين"
          caption="شاشة البيع بالإنجليزية. الطلب على اليمين مرسوم على هيئة الإيصال الذي سيُطبع."
        />
      </Section>

      <Section>
        <SectionTitle>مصمَّم لطريقة تعامل المتاجر هنا مع النقد</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="الدينار، مقرَّبًا كما في التعامل النقدي">
            تُقرَّب المجاميع إلى أقرب 250 دينارًا، فيكون المبلغ الظاهر على الشاشة مبلغًا يستطيع الزبون دفعه فعلًا.
          </ServiceCard>
          <ServiceCard title="الدولار بسعر صرف المتجر">
            يمكن للزبون الدفع بالدولار بالسعر الذي يحدده المتجر، ويُعاد الباقي بالدينار.
          </ServiceCard>
          <ServiceCard title="حسابات ديون الزبائن">
            يمكن تسجيل البيع على حساب الزبون، ويرى المتجر من عليه دَين وكم مقداره.
          </ServiceCard>
          <ServiceCard title="إيصالات تطبع الكردية والعربية صحيحة">
            تُرسم الإيصالات كصورة قبل الطباعة، فتظهر الكردية والعربية صحيحة على الطابعات الحرارية الرخيصة.
          </ServiceCard>
        </ServicesGrid>
      </Section>

      <Section>
        <SectionTitle>من اليمين إلى اليسار</SectionTitle>
        <Split
          media={
            <Shot
              shot={SHOTS.qasaSellKu}
              alt="شاشة البيع نفسها بالكردية معكوسة: التنقل على اليمين والطلب على اليسار"
            />
          }
        >
          <Note title="تنعكس الشاشة كاملةً للكردية والعربية.">
            ينتقل شريط التنقل إلى اليمين والطلب إلى اليسار. وتبقى الأسعار بالأرقام نفسها والخط نفسه في كل
            اللغات، فيقرؤها أمين الصندوق بالطريقة نفسها.
          </Note>
        </Split>
      </Section>

      <Section>
        <SectionTitle>ما الذي يتضمنه</SectionTitle>
        <Split
          top
          media={
            <Shot
              shot={SHOTS.qasaReports}
              alt="شاشة التقارير في Qasa: إجماليات المبيعات، مخطط المبيعات حسب الساعة، والأكثر مبيعًا"
              caption="التقارير، مع التصدير إلى Excel."
            />
          }
        >
          <SpecList>
            <SpecRow term="البيع">شبكة منتجات، بحث، قارئ باركود، أحجام، خصومات، وتعليق الطلب واستعادته.</SpecRow>
            <SpecRow term="الدفع">نقدًا بالدينار أو الدولار، بطاقة، محفظة، على الحساب، أو تقسيم الدفع بينها.</SpecRow>
            <SpecRow term="الطاولات">طلبات مفتوحة لكل طاولة، داخل المحل وسفري وتوصيل، وتذاكر المطبخ.</SpecRow>
            <SpecRow term="المخزون">المنتجات والفئات، الاستلام، الجرد، وتنبيهات انخفاض المخزون.</SpecRow>
            <SpecRow term="الورديات">
              رصيد الافتتاح، إيداع وسحب النقد مع ذكر السبب، وجرد وتقرير نهاية الوردية.
            </SpecRow>
            <SpecRow term="التقارير">
              المبيعات حسب الساعة والمنتج والفئة وطريقة الدفع والموظف، مع التصدير إلى Excel.
            </SpecRow>
            <SpecRow term="الموظفون">
              أدوار المالك والمدير وأمين الصندوق. رمز المدير يوافق على الخصومات والإلغاءات والمرتجعات.
            </SpecRow>
            <SpecRow term="الأمان">
              نسخ احتياطي يومي مع الاستعادة، قفل تلقائي عند ترك الصندوق، وتوقّف مؤقت بعد تكرار الرمز الخاطئ.
            </SpecRow>
          </SpecList>
        </Split>
      </Section>

      <Section>
        <SectionTitle>بُني لعميل</SectionTitle>
        <WorkList>
          <WorkRow title="Chrispy POS">
            نسخة من Qasa بُنيت حول كشك مأكولات سريعة: قائمته وأسعاره وإضافاته وتذاكر المطبخ، وهويته على كل شاشة.
          </WorkRow>
        </WorkList>
        <div className="mt-10">
          <CtaRow text="تريد نظامًا كهذا يُبنى لعملك؟ تواصل معي.">
            <Button href={pagePath(LANG, 'contact')}>تواصل معي</Button>
          </CtaRow>
        </div>
      </Section>
    </>
  );
}
