import { buildMetadata } from '../../../lib/metadata';
import ContactEn from '../_content/contact.en';
import ContactAr from '../_content/contact.ar';
import ContactKu from '../_content/contact.ku';

const CONTENT = { en: ContactEn, ar: ContactAr, ku: ContactKu };

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata(lang, 'contact');
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const Content = CONTENT[lang];
  return <Content />;
}
