import { createLangPage } from '@/lib/page';
import Projects from '../_pages/Projects';

const { generateMetadata, Page } = createLangPage('projects', Projects);

export { generateMetadata };
export default Page;
