import { useEffect } from "react";
import { CartPage } from "./Header-cart-page";
import './cart.css'

export default function Cart(){
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
                <div className="animation">
                    <CartPage />
                </div>
        </>
    );
}