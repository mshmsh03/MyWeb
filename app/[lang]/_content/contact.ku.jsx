import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '@/lib/site-data';
import {
  Button,
  ButtonRow,
  Card,
  ContactList,
  ContactRow,
  PageHeader,
  Section,
  SectionTitle,
  SpecList,
  SpecRow,
  Split,
} from '@/components/sections';

export default function ContactKu() {
  return (
    <>
      <PageHeader>پەیوەندی</PageHeader>
      <Section>
        <Split
          top
          media={
            <Card>
              <p className="mb-5">
                ئامادەم بۆ یارمەتیدان لە بنیاتنان، چاککردنەوە یان شیکردنەوەی کێشەی پڕۆژەی داهاتووت.
              </p>
              <p className="mb-5">کراوەم بۆ دەرفەتی ڕاهێنان، کاری ئازاد و هاوکاری.</p>
              <ButtonRow className="mb-6">
                <Button href={`mailto:${EMAIL}`}>ئیمەیلم بۆ بنێرە</Button>
                <Button href={PHONE_HREF} tone="ghost">
                  پەیوەندیم پێوە بکە
                </Button>
                <Button href={WHATSAPP_HREF} tone="ghost">
                  واتساپ
                </Button>
              </ButtonRow>
              <ContactList>
                <ContactRow label="ئیمەیل" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </ContactRow>
                <ContactRow label="تەلەفۆن" href={PHONE_HREF}>
                  {PHONE_DISPLAY}
                </ContactRow>
                <ContactRow label="واتساپ" href={WHATSAPP_HREF}>
                  {PHONE_DISPLAY}
                </ContactRow>
              </ContactList>
            </Card>
          }
        >
          <SectionTitle>چی بنێریت</SectionTitle>
          <SpecList>
            <SpecRow term="ماڵپەڕ">
              کارەکەت چی دەکات، ماڵپەڕەکە بە چ زمانێک پێویستە، و کەی دەبێت ئامادە بێت.
            </SpecRow>
            <SpecRow term="سیستەمی فرۆشتن">
              چی دەفرۆشیت، چەند شوێنی فرۆشتنت هەیە، و چ پرینتەرێکی پسوولە بەکاردەهێنیت.
            </SpecRow>
            <SpecRow term="چاککردنەوە">
              ئامێرەکە و مۆدێلەکەی، چی دەکات یان ناکات، و کەی کێشەکە دەستی پێکرد.
            </SpecRow>
          </SpecList>
        </Split>
      </Section>
    </>
  );
}
