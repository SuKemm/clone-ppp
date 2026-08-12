import { MainLayout } from '@/components/main-layout';
import { SectionPage } from '@/components/section-page';
import { tuoiTrePvoilContent } from '@/lib/section-page-data';

export default function TuoiTrePage() {
  return (
    <MainLayout>
      <SectionPage content={tuoiTrePvoilContent} />
    </MainLayout>
  );
}
