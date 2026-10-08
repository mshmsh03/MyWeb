import { createLangPage } from '@/lib/page';
import About from '../_pages/About';

const { generateMetadata, Page } = createLangPage('about', About);

export { generateMetadata };
export default Page;
