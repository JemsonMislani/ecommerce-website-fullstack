import FooterPage from "../home-components/FooterPage";
import Header from "../home-components/Header";
import { ShopPage } from "./ShopPage";
import '../responsiveness/ShopPage.css'
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function Shop(){
    useScrollAnimation()
    return(
        <>
            <Header />
            <div className="animation">
                <ShopPage />
            </div>
            <div className="animation">
                <FooterPage />
            </div>
        </>
    );
}