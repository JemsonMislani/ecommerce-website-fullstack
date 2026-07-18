import { CartPage } from "./Header-cart-page";
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function Cart(){
    useScrollAnimation()
    return(
        <>
                <div className="animation">
                    <CartPage />
                </div>
        </>
    );
}