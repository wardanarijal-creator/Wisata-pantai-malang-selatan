import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedBeaches } from "@/components/home/FeaturedBeaches";
import { ServicesSection } from "@/components/home/ServicesSection";
import { LatestArticles } from "@/components/home/LatestArticles";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedBeaches />
      <ServicesSection />
      <LatestArticles />
      <CTASection />
    </Layout>
  );
};

export default Index;
