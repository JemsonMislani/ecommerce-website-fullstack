import { useEffect } from "react";
import FooterPage from "../home-components/FooterPage";
import Header from "../home-components/Header";
import EstablishedBusiness from "./EstablishedBusiness";
import FirstIndustry from "./FirstIndustry";
import Journey from "./Journey";
import TheCertificate from "./TheCertificate";

export default function JourneyComponents(){

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
                <Journey />
            </div>
            <div className="animation">
                <FirstIndustry />
            </div>
            <div className="animation">
                <TheCertificate />
            </div>
            <div className="animation">
                <EstablishedBusiness />
            </div>
            <div className="animation">
                <FooterPage />
            </div>
        </>
    );
}