import { useEffect } from "react";
import Header from "./Header";
import HomeSlider from "./HomeSliderImages";
import SectionPage from "./SectionPage";
import CollectionPage from "./CollectionPage";
import AboutUs from "./AboutUs";
import FooterPage from "./FooterPage";
import './Home.css'

export default function Home(){
        useEffect(() => {
        const animations = document.querySelectorAll(".animation");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        entry.target.classList.add("active");
                    }
                });
            },
            {
                threshold:.2
            }
        );
        animations.forEach((el)=>observer.observe(el));
        return ()=>observer.disconnect();
    },[]);

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