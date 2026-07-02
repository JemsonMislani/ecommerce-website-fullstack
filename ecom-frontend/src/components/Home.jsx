import Header from "./Header";
import HomeSlider from "./HomeSliderImages";
import SectionPage from "./SectionPage";
import { CollectionPage } from "./CollectionPage";

export default function Home(){
    return(
        <>
            <Header />
            <HomeSlider />
            <SectionPage />
            <CollectionPage />
        </>
    );
}