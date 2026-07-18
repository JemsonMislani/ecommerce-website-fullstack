import { useEffect } from "react";
import Header from "./Header";
import HomeSlider from "./HomeSliderImages";
import SectionPage from "./SectionPage";
import CollectionPage from "./CollectionPage";
import AboutUs from "./AboutUs";
import FooterPage from "./FooterPage";
import { useLocation } from 'react-router-dom';
import '../responsiveness/HomePage.css'
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function Home(){
        useScrollAnimation()
        const loc = useLocation();
            useEffect(() => {
                if(loc.hash === '#footwear') {
                    const timeout = setTimeout(() => {
                        const elem = document.getElementById('footwear');
                        if (elem) {
                            elem.scrollIntoView();
                        }
                    }, 50)
                    return () => clearTimeout(timeout)
                }
            }, [loc])

    return(
        <>
            <Header />
        <div className="animation">
            <HomeSlider />
        </div>
        <div className="animation">
            <SectionPage />
        </div>
        <div className="animation">
            <CollectionPage />
        </div>
        <div className="animation">
            <AboutUs />
        </div>
        <div className="animation">
            <FooterPage />
        </div>
        </>
    );
}