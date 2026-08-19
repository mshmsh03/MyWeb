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
const LANG = 'en';

export default function AboutEn() {
  return (
    <>
      <PageHeader>About</PageHeader>
      <Section>
        <AboutList>
          <AboutItem note="currently">
            Computer Engineering student at Tishk International University, Erbil.
          </AboutItem>
          <AboutItem note="what I do">
            Experienced in both software and hardware: website development and deployment, hardware diagnostics
            and repair (including part replacement), and local network setup for shared office devices.
          </AboutItem>
          <AboutItem note="why">
            Motivated by understanding systems end-to-end — from website code to hardware internals — and by
            solving practical, real-world problems.
          </AboutItem>
        </AboutList>
        <CtaRow text="Interested in working together? Get in touch.">
          <Button href={pagePath(LANG, 'contact')}>Contact Me</Button>
        </CtaRow>
      </Section>
    </>
  );
}
