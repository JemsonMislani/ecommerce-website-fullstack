import { useEffect } from "react";
import FooterPage from "../home-components/FooterPage";
import Header from "../home-components/Header";
import BusinessLink from "./BusinessLink";
import './BusinessComponent.css'

export default function BusinessComponent(){
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
        <Header/>
        <div className="animation">
            <BusinessLink />
        </div>
        <div className="animation">
            <FooterPage />
        </div>
    </>
    );
}