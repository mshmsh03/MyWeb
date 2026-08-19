import { createLangPage } from '@/lib/page';
import ContactEn from '../_content/contact.en';
import ContactAr from '../_content/contact.ar';
import ContactKu from '../_content/contact.ku';

const { generateMetadata, Page } = createLangPage('contact', { en: ContactEn, ar: ContactAr, ku: ContactKu });

export { generateMetadata };
export default Page;
