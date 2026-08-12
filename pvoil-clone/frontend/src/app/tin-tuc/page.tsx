import { MainLayout } from '@/components/main-layout';
import { SectionPage } from '@/components/section-page';
import { tinTucContent } from '@/lib/section-page-data';

export default function TinTucPage() {
  return (
    <MainLayout>
      <SectionPage content={tinTucContent} />
    </MainLayout>
  );
}
