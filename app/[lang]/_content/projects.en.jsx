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
const LANG = 'en';

export default function ProjectsEn() {
  return (
    <>
      <PageHeader>Projects</PageHeader>
      <Section>
        <Lead>Websites, point-of-sale systems and print work built for real businesses.</Lead>

        <WorkGroup title="Websites">
          <SiteGrid>
            <SiteCard
              href="https://www.ellincompany.com"
              shot={SHOTS.ellin}
              alt="Home page of the Ellin Company website"
              title="Ellin Company"
              domain="www.ellincompany.com"
            >
              Trilingual site for a construction contractor. Design, build, deployment and hosting.
            </SiteCard>
            <SiteCard
              href="https://brightvolition.com"
              shot={SHOTS.brightVolition}
              alt="Home page of the Bright Volition website"
              title="Bright Volition"
              domain="brightvolition.com"
            >
              Trilingual site for an industrial supply and engineering firm. Rebuilt, then moved to new hosting
              with every old link redirected.
            </SiteCard>
          </SiteGrid>
          <WorkList>
            <WorkRow title="Chrispy — menu website">
              One-page menu for a street-food kiosk’s Instagram link, in Kurdish and English, with a builder that
              adds up an order as you tap.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <WorkGroup title="Software">
          <SiteGrid>
            <SiteCard
              wide
              href={pagePath(LANG, 'projects/qasa')}
              shot={SHOTS.qasaSell}
              alt="The sell screen of the Qasa point-of-sale system"
              title="Qasa POS"
              more="read more"
            >
              A sample till that shows what I can build for a shop: sales, stock, shifts and reports in Kurdish,
              Arabic and English, working without internet. Each client gets a version built around their
              business.
            </SiteCard>
          </SiteGrid>
          <WorkList>
            <WorkRow title="Chrispy POS">
              Qasa rebuilt around one street-food kiosk: its own menu, add-ons, kitchen tickets, cash drawer and
              daily reports.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <WorkGroup title="Print">
          <WorkList>
            <WorkRow title="Krofi — rebrand and menu">
              Logo, colours, Kurdish and English type, product mockups and a printed menu for a sweets kiosk.
            </WorkRow>
            <WorkRow title="Chrispy — printed menu">
              Four A4 pages in English and Kurdish, with the Kurdish pages laid out as a true right-to-left
              mirror.
            </WorkRow>
            <WorkRow title="Ellin Company — business card">
              Double-sided cards in Arabic, Kurdish and English, delivered as print-shop files.
            </WorkRow>
            <WorkRow title="Ellin Company — company profile">
              Company profile design for a construction firm, produced in Canva.
            </WorkRow>
            <WorkRow title="Bright Volition — company profile">
              A 24-page profile in English, plus an Arabic edition rebuilt page by page as a right-to-left mirror.
            </WorkRow>
          </WorkList>
        </WorkGroup>

        <div className="mt-14">
          <CtaRow text="Interested in working together? Get in touch.">
            <Button href={pagePath(LANG, 'contact')}>Contact Me</Button>
          </CtaRow>
        </div>
      </Section>
    </>
  );
}
