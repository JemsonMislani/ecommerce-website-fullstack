import { useEffect } from "react";
import Header from "../home-components/Header.jsx";
import './BlogClicked.css'
import BlogResult from "./BlogResult.jsx";

export default function BlogClicked() {
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
            <div className='animation'>
                <BlogResult />
            </div>
        </>
    );
}
