import { useEffect } from "react";
import './scrollAnimation.css'

export default function useScrollAnimation() {
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
}