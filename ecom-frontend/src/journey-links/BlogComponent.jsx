import { useEffect } from 'react';
import FooterPage from '../home-components/FooterPage';
import Header from '../home-components/Header';
import './BlogComponent.css';
import BlogLink from './Bloglink';
export default function BlogComponent() {
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
                <BlogLink />
            </div>
            <div className='animation'>
                <FooterPage />
            </div>
        </>
    );
}