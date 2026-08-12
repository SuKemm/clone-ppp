import { BannerSlider } from '@/components/banner-slider';
import { HeroSection } from '@/components/hero-section';
import { NewsSection } from '@/components/news-section';
import { NewsCarousel } from '@/components/news-carousel';
import { PriceTable } from '@/components/price-table';
import { BusinessAreas } from '@/components/business-areas';
import { RetailNetwork } from '@/components/retail-network';
import { Sustainability } from '@/components/sustainability';
import { InvestorRelations } from '@/components/investor-relations';
import { MainLayout } from '@/components/main-layout';

export default function HomePage() {
  return (
    <MainLayout>
      <BannerSlider />
      <HeroSection />
      <NewsSection />
      <PriceTable />
      <InvestorRelations />
      <BusinessAreas />
      <NewsCarousel />
      <RetailNetwork />
      <Sustainability />
    </MainLayout>
  );
}
