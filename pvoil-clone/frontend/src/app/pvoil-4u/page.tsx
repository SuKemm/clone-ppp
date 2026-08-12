import { MainLayout } from '@/components/main-layout';
import { SectionPage } from '@/components/section-page';
import { pvoil4uContent } from '@/lib/section-page-data';

export default function Pvoil4uPage() {
  return (
    <MainLayout>
      <SectionPage content={pvoil4uContent} />
    </MainLayout>
  );
}
