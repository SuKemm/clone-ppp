import { MainLayout } from '@/components/main-layout';
import { SectionPage } from '@/components/section-page';
import { quanHeCoDongContent } from '@/lib/section-page-data';

export default function QuanHeCoDongPage() {
  return (
    <MainLayout>
      <SectionPage content={quanHeCoDongContent} />
    </MainLayout>
  );
}
