import { CardStack, PageHeader, ProjectCard, Section } from '@/components/sections';

export default function ProjectsEn() {
  return (
    <>
      <PageHeader>Projects</PageHeader>
      <Section>
        <CardStack>
          <ProjectCard
            title="Ellin Company Website"
            tag="live"
            link={{ href: 'https://www.ellincompany.com', label: 'www.ellincompany.com' }}
          >
            Live, trilingual (English, Arabic, Kurdish) website for a construction company,
            including full production deployment and hosting.
          </ProjectCard>
          <ProjectCard
            title="Bright Volition — Company Website"
            tag="shipped"
            link={{ href: 'https://brightvolition.com', label: 'brightvolition.com' }}
          >
            Website developed for an engineering firm.
          </ProjectCard>
          <ProjectCard title="Construction Company Portfolio" tag="completed">
            Company profile design for a construction firm, produced in Canva.
          </ProjectCard>
          <ProjectCard title="Prayer Times App — Terms &amp; Conditions Page" tag="design">
            Page designs for a prayer times application, aligned with its existing visual identity.
          </ProjectCard>
        </CardStack>
      </Section>
    </>
  );
}
