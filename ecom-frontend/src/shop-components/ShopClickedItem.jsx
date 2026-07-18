import FooterPage from "../home-components/FooterPage";
import Header from "../home-components/Header";
import ShowItemClicked from "./ShowItemClicked";
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function ClickedItem(){
    useScrollAnimation()
    return(
    <>
        <Header />
        <div className="animation">
            <ShowItemClicked />
        </div>
        <div className="animation">
            <FooterPage />
        </div>
    </>
    );
}