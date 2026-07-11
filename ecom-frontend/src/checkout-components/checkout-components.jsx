import CheckoutPage from './checkout-page';
import { useEffect } from 'react';
import './checkout-components.css'

export default function Checkout(){
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
        <div className='animation'>
            <CheckoutPage />
        </div>
        </>
    );
}