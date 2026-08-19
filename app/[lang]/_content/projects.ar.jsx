import { CardStack, PageHeader, ProjectCard, Section } from '@/components/sections';

export default function ProjectsAr() {
  return (
    <>
      <PageHeader>المشاريع</PageHeader>
      <Section>
        <CardStack>
          <ProjectCard
            title="موقع شركة إيلين"
            tag="مباشر"
            link={{ href: 'https://www.ellincompany.com', label: 'www.ellincompany.com' }}
          >
            موقع إلكتروني مباشر ومتعدد اللغات طُوِّر لشركة إنشاءات.
          </ProjectCard>
          <ProjectCard title="برايت فوليشن — موقع الشركة" tag="مُسلَّم">
            موقع إلكتروني طُوِّر لشركة هندسية.
          </ProjectCard>
          <ProjectCard title="ملف تعريفي لشركة إنشاءات" tag="مكتمل">
            تصميم ملف تعريفي لشركة إنشاءات، أُنجز باستخدام Canva.
          </ProjectCard>
          <ProjectCard title="تطبيق أوقات الصلاة — صفحة الشروط والأحكام" tag="تصميم">
            تصاميم صفحات لتطبيق أوقات الصلاة، متوافقة مع هويته البصرية القائمة.
          </ProjectCard>
        </CardStack>
      </Section>
    </>
  );
}
