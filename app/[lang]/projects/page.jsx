import { buildMetadata } from '../../../lib/metadata';
import ProjectsEn from '../_content/projects.en';
import ProjectsAr from '../_content/projects.ar';
import ProjectsKu from '../_content/projects.ku';

const CONTENT = { en: ProjectsEn, ar: ProjectsAr, ku: ProjectsKu };

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata(lang, 'projects');
}

export default async function ProjectsPage({ params }) {
  const { lang } = await params;
  const Content = CONTENT[lang];
  return <Content />;
}
