import { createLangPage } from '@/lib/page';
import Contact from '../_pages/Contact';

const { generateMetadata, Page } = createLangPage('contact', Contact);

export { generateMetadata };
export default Page;
