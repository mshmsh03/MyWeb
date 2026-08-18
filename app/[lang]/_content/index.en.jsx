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

export default function IndexEn() {
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
        <Role>Computer Engineering Student — Software &amp; Hardware</Role>
        <Tagline>
          Computer Engineering student with hands-on experience across software development and hardware systems.
        </Tagline>
        <ButtonRow>
          <Button href="/en/projects/">View Projects</Button>
          <Button href="/en/contact/" tone="ghost">
            Contact Me
          </Button>
        </ButtonRow>
      </Section>

      <Section id="services">
        <SectionTitle>Services</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="Website Development">
            Design and development of websites, including multilingual sites supporting Arabic and Kurdish.
          </ServiceCard>
          <ServiceCard title="Hardware Maintenance &amp; Repair">
            Diagnosing and resolving hardware issues, including part replacement and device maintenance.
          </ServiceCard>
          <ServiceCard title="Network Setup">
            Built local networks for offices, including shared printer and device connectivity across multiple
            computers.
          </ServiceCard>
        </ServicesGrid>
        <CtaRow text="Interested in working together? Get in touch.">
          <Button href="/en/contact/">Contact Me</Button>
        </CtaRow>
      </Section>
    </>
  );
}
