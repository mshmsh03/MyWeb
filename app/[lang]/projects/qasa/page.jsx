import { createLangPage } from '@/lib/page';
import QasaEn from '../../_content/qasa.en';
import QasaAr from '../../_content/qasa.ar';
import QasaKu from '../../_content/qasa.ku';

const { generateMetadata, Page } = createLangPage('projects/qasa', { en: QasaEn, ar: QasaAr, ku: QasaKu });

export { generateMetadata };
export default Page;
