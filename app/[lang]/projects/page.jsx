import { createLangPage } from '@/lib/page';
import ProjectsEn from '../_content/projects.en';
import ProjectsAr from '../_content/projects.ar';
import ProjectsKu from '../_content/projects.ku';

const { generateMetadata, Page } = createLangPage('projects', { en: ProjectsEn, ar: ProjectsAr, ku: ProjectsKu });

export { generateMetadata };
export default Page;
