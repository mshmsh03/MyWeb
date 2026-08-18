import { buildMetadata } from '../../../lib/metadata';
import AboutEn from '../_content/about.en';
import AboutAr from '../_content/about.ar';
import AboutKu from '../_content/about.ku';

const CONTENT = { en: AboutEn, ar: AboutAr, ku: AboutKu };

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata(lang, 'about');
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const Content = CONTENT[lang];
  return <Content />;
}
