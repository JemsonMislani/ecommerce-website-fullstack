import FooterPage from "../home-components/FooterPage";
import Header from "../home-components/Header";
import BusinessLink from "./BusinessLink";
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function BusinessComponent(){
    useScrollAnimation()
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