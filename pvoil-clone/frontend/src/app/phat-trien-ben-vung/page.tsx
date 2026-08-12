import { MainLayout } from '@/components/main-layout';
import { SectionPage } from '@/components/section-page';
import { phatTrienBenVungContent } from '@/lib/section-page-data';

export default function PtbvPage() {
  return (
    <MainLayout>
      <SectionPage content={phatTrienBenVungContent} />
    </MainLayout>
  );
}
