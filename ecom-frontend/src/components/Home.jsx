import Header from "./Header";
import HomeSlider from "./HomeSliderImages";
import SectionPage from "./SectionPage";
import CollectionPage from "./CollectionPage";
import AboutUs from "./AboutUs";
import FooterPage from "./FooterPage";

export default function Home(){
    return(
        <>
            <Header />
            <HomeSlider />
            <SectionPage />
            <CollectionPage />
            <AboutUs />
            <FooterPage />
        </>
    );
}