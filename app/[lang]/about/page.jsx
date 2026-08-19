import { createLangPage } from '@/lib/page';
import AboutEn from '../_content/about.en';
import AboutAr from '../_content/about.ar';
import AboutKu from '../_content/about.ku';

const { generateMetadata, Page } = createLangPage('about', { en: AboutEn, ar: AboutAr, ku: AboutKu });

export { generateMetadata };
export default Page;
