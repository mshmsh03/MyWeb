import { CardStack, PageHeader, ProjectCard, Section } from '@/components/sections';

export default function ProjectsKu() {
  return (
    <>
      <PageHeader>پڕۆژەکان</PageHeader>
      <Section>
        <CardStack>
          <ProjectCard
            title="ماڵپەڕی کۆمپانیای ئێلین"
            tag="زیندوو"
            link={{ href: 'https://www.ellincompany.com', label: 'www.ellincompany.com' }}
          >
            ماڵپەڕێکی زیندووی فرەزمان کە بۆ کۆمپانیایەکی بیناسازی دروست کراوە.
          </ProjectCard>
          <ProjectCard title="برایت ڤۆلیشن — ماڵپەڕی کۆمپانیا" tag="ڕادەستکراو">
            ماڵپەڕێک کە بۆ کۆمپانیایەکی ئەندازیاری دروست کراوە.
          </ProjectCard>
          <ProjectCard title="پرۆفایلی کۆمپانیایەکی بیناسازی" tag="تەواوکراو">
            دیزاینی پرۆفایلی کۆمپانیا بۆ فیرمێکی بیناسازی، بە Canva ئەنجام دراوە.
          </ProjectCard>
          <ProjectCard title="ئەپی کاتەکانی نوێژ — پەڕەی مەرج و ڕێساکان" tag="دیزاین">
            دیزاینی پەڕە بۆ ئەپی کاتەکانی نوێژ، لەگەڵ ناسنامەی بینراوی ئێستایدا گونجاو.
          </ProjectCard>
        </CardStack>
      </Section>
    </>
  );
}
