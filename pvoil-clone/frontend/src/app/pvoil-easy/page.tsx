import { MainLayout } from '@/components/main-layout';
import { SectionPage } from '@/components/section-page';
import { pvoilEasyContent } from '@/lib/section-page-data';

export default function PvoilEasyPage() {
  return (
    <MainLayout>
      <SectionPage content={pvoilEasyContent} />
    </MainLayout>
  );
}
