import SliderBanner from "../Components/SliderBanner";
import ValueProps from "../Components/ValueProps";
import FeaturedArtworks from "../Components/FeaturedArtworks";
import CategoriesShowcase from "../Components/CategoriesShowcase";
import SiteStats from "../Components/SiteStats";
import TopArtists from "../Components/TopArtists";
import CommunityHighlights from "../Components/CommunityHighlights";
import HowItWorks from "../Components/HowItWorks";
import FaqSection from "../Components/FaqSection";
import NewsletterCTA from "../Components/NewsletterCTA";

const Home = () => {
    return (
        <div className="overflow-x-hidden w-full">
            <div className="space-y-16 md:space-y-24">
                <SliderBanner />
                <ValueProps />
                <FeaturedArtworks />
                <CategoriesShowcase />
                <SiteStats />
                <TopArtists />
                <CommunityHighlights />
                <HowItWorks />
                <FaqSection />
                <NewsletterCTA />
            </div>
        </div>
    );
};

export default Home;
