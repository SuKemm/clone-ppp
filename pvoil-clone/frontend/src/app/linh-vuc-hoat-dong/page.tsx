import { MainLayout } from '@/components/main-layout';
import { SectionPage } from '@/components/section-page';
import { linhVucHoatDongContent } from '@/lib/section-page-data';

export default function LinhVucPage() {
  return (
    <MainLayout>
      <SectionPage content={linhVucHoatDongContent} />
    </MainLayout>
  );
}
