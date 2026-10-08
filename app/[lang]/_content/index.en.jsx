import { EMAIL, NAME, PHONE_HREF, SHOTS, WHATSAPP_HREF, pagePath } from '@/lib/site-data';
import Typewriter from '@/components/Typewriter';
import {
  Button,
  ButtonRow,
  CtaRow,
  Hero,
  Prompt,
  Role,
  Section,
  SectionTitle,
  ServiceCard,
  ServicesGrid,
  SiteCard,
  SiteGrid,
  StatusPanel,
  StatusRow,
  Tagline,
  WorkList,
  WorkRow,
} from '@/components/sections';

// The route shape (which segments, where the trailing slash goes) is
// pagePath's business, not the copy's — this file only says *which* page.
const LANG = 'en';

export default function IndexEn() {
  return (
    <>
      <Section id="hero">
        <Hero
          aside={
            <StatusPanel>
              <StatusRow label="studying">Computer Engineering, Tishk International University</StatusRow>
              <StatusRow label="works in">English · Arabic · Kurdish</StatusRow>
              <StatusRow label="open to">internships · freelance · collaboration</StatusRow>
            </StatusPanel>
          }
        >
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
            I build and deploy websites in English, Arabic and Kurdish, build point-of-sale systems for shops, and
            diagnose and repair hardware.
          </Tagline>
          <ButtonRow>
            <Button href={pagePath(LANG, 'projects')}>View Projects</Button>
            <Button href={pagePath(LANG, 'contact')} tone="ghost">
              Contact Me
            </Button>
          </ButtonRow>
        </Hero>
      </Section>

      <Section id="websites">
        <SectionTitle>Client websites</SectionTitle>
        <SiteGrid>
          <SiteCard
            href="https://www.ellincompany.com"
            shot={SHOTS.ellin}
            alt="Home page of the Ellin Company website"
            title="Ellin Company"
            domain="www.ellincompany.com"
          >
            Company website for a construction contractor, in English, Arabic and Kurdish. Built, deployed and
            hosted end to end.
          </SiteCard>
          <SiteCard
            href="https://brightvolition.com"
            shot={SHOTS.brightVolition}
            alt="Home page of the Bright Volition website"
            title="Bright Volition"
            domain="brightvolition.com"
          >
            Company website for an industrial supply and engineering firm, in English, Arabic and Kurdish. Rebuilt
            and moved to new hosting with every old link still working.
          </SiteCard>
        </SiteGrid>
      </Section>

      <Section id="work">
        <SectionTitle>Also built</SectionTitle>
        <WorkList>
          <WorkRow title="Qasa POS" href={pagePath(LANG, 'projects/qasa')} more="read more">
            A sample till that shows the kind of system I can build for a shop: sales, stock and reports in
            Kurdish, Arabic and English.
          </WorkRow>
          <WorkRow title="Chrispy POS">
            Qasa rebuilt around one street-food kiosk, with its own menu, add-ons and kitchen tickets.
          </WorkRow>
          <WorkRow title="Krofi — rebrand and menu">
            Logo, colours, type and a printed Kurdish–English menu for a sweets kiosk.
          </WorkRow>
          <WorkRow title="Ellin — business card">
            Double-sided cards in Arabic, Kurdish and English, delivered as print-shop files.
          </WorkRow>
        </WorkList>
        <ButtonRow className="mt-6">
          <Button href={pagePath(LANG, 'projects')} tone="ghost">
            All Projects
          </Button>
        </ButtonRow>
      </Section>

      <Section id="services">
        <SectionTitle>Services</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="Website Development">
            Design and development of websites, including multilingual sites supporting Arabic and Kurdish.
          </ServiceCard>
          <ServiceCard title="Point-of-Sale Systems">
            A till built around your shop, kiosk or restaurant, in Kurdish, Arabic and English. Works without
            internet.
          </ServiceCard>
          <ServiceCard title="Hardware Maintenance &amp; Repair">
            Diagnosing and resolving hardware issues, including part replacement and device maintenance.
          </ServiceCard>
        </ServicesGrid>
        <CtaRow text="Interested in working together? Get in touch.">
          <ButtonRow>
            <Button href={`mailto:${EMAIL}`}>Email Me</Button>
            <Button href={PHONE_HREF} tone="ghost">
              Call Me
            </Button>
            <Button href={WHATSAPP_HREF} tone="ghost">
              WhatsApp
            </Button>
          </ButtonRow>
        </CtaRow>
      </Section>
    </>
  );
}
