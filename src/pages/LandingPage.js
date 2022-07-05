import CTASection from "../components/CTASection";
import GenesisNFTs from "../components/GenesisNFTs";
import TrendingAuctions from "../components/TrendingAuctions";
import TrendingCollectors from "../components/TrendingCollectors";
import TrendingCreators from "../components/TrendingCreators";
import TrendingNFTs from "../components/TrendingNFTs";
import HeroSlider from '../components/HeroSlider';
import AnimatedPage from "./AnimatedPage";


function LandingPage() {
  return (
    <AnimatedPage>
      <div className="landing-page">
        <HeroSlider />
        {/* <TrendingAuctions /> */}
        <TrendingNFTs />
        {/* <GenesisNFTs /> */}
        <TrendingCollectors />
        <TrendingCreators />
        {/* <CTASection /> */}
      </div>
    </AnimatedPage>
  );
}

export default LandingPage;
