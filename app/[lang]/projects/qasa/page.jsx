import { createLangPage } from '@/lib/page';
import Qasa from '../../_pages/Qasa';

const { generateMetadata, Page } = createLangPage('projects/qasa', Qasa);

export { generateMetadata };
export default Page;
