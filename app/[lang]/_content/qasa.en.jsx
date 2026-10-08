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
const LANG = 'en';

export default function QasaEn() {
  return (
    <>
      <Section>
        <PathCrumb href={pagePath(LANG, 'projects')} parent="projects" leaf="qasa" />
        {/* A product name, so it stays in Latin and mono in every language. */}
        <h1 className="ltr-fixed m-fade">Qasa POS</h1>
        <Role>A sample point-of-sale system</Role>
        <Lead>
          Qasa is a sample till I built to show what I can make for a business. It runs on the shop’s own computer,
          works in Kurdish, Arabic and English, and needs no internet connection or account. For a client, I build
          a version of it around how they sell.
        </Lead>
        <FactList>
          <Fact label="Runs on">
            <span className="ltr-fixed">Windows · Linux · macOS</span>
          </Fact>
          <Fact label="Languages">Kurdish · Arabic · English</Fact>
          <Fact label="Fits">Shops · restaurants · kiosks</Fact>
          <Fact label="Checked by">112 automated tests</Fact>
        </FactList>
        <Shot
          shot={SHOTS.qasaSell}
          alt="Qasa’s sell screen: a grid of products on the left and the order, drawn like a paper receipt, on the right"
          caption="The sell screen. The order on the right is drawn like the receipt it will print."
        />
      </Section>

      <Section>
        <SectionTitle>Built for how shops here take money</SectionTitle>
        <ServicesGrid>
          <ServiceCard title="Dinars, rounded the way cash works">
            Totals are rounded to the nearest 250 dinars, so the amount on the screen is an amount a customer can
            actually hand over.
          </ServiceCard>
          <ServiceCard title="Dollars at the shop’s own rate">
            Customers can pay in dollars at the rate the shop sets. The change comes back in dinars.
          </ServiceCard>
          <ServiceCard title="Customer debt accounts">
            A sale can go on a customer’s account, and the shop can see who owes what.
          </ServiceCard>
          <ServiceCard title="Receipts that print Kurdish correctly">
            Receipts are drawn as an image before printing, so Kurdish and Arabic come out right on inexpensive
            thermal printers.
          </ServiceCard>
        </ServicesGrid>
      </Section>

      <Section>
        <SectionTitle>Right to left</SectionTitle>
        <Split
          media={
            <Shot
              shot={SHOTS.qasaSellKu}
              alt="The same sell screen in Kurdish, mirrored: navigation on the right, the order on the left"
            />
          }
        >
          <Note title="The whole screen mirrors for Kurdish and Arabic.">
            Navigation moves to the right and the order to the left. Prices stay in the same digits and the same
            typeface in every language, so a cashier reads them the same way.
          </Note>
        </Split>
      </Section>

      <Section>
        <SectionTitle>What is in it</SectionTitle>
        <Split
          top
          media={
            <Shot
              shot={SHOTS.qasaReports}
              alt="Qasa’s reports screen with sales totals, a sales-by-hour chart and best sellers"
              caption="Reports, with export to Excel."
            />
          }
        >
          <SpecList>
            <SpecRow term="Sell">Product grid, search, barcode scanner, sizes, discounts, hold and recall.</SpecRow>
            <SpecRow term="Pay">Cash in dinars or dollars, card, wallet, on account, or split between them.</SpecRow>
            <SpecRow term="Tables">
              Running orders per table, dine-in, takeaway and delivery, kitchen tickets.
            </SpecRow>
            <SpecRow term="Stock">Products and categories, receiving, counting, low-stock warnings.</SpecRow>
            <SpecRow term="Shifts">
              Opening cash, cash in and out with a reason, end-of-shift count and report.
            </SpecRow>
            <SpecRow term="Reports">
              Sales by hour, product, category, payment method and staff, with export to Excel.
            </SpecRow>
            <SpecRow term="Staff">
              Owner, manager and cashier roles. A manager’s PIN approves discounts, voids and refunds.
            </SpecRow>
            <SpecRow term="Safety">
              Daily backups with restore, automatic lock when the till is left alone, a pause after repeated wrong
              PINs.
            </SpecRow>
          </SpecList>
        </Split>
      </Section>

      <Section>
        <SectionTitle>Built for a client</SectionTitle>
        <WorkList>
          <WorkRow title="Chrispy POS">
            Qasa rebuilt around one street-food kiosk: its own menu and prices, add-ons, kitchen tickets and its
            own brand on every screen.
          </WorkRow>
        </WorkList>
        <div className="mt-10">
          <CtaRow text="Want a system like this built for your business? Get in touch.">
            <Button href={pagePath(LANG, 'contact')}>Contact Me</Button>
          </CtaRow>
        </div>
      </Section>
    </>
  );
}
