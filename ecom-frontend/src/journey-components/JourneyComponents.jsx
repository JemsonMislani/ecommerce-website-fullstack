import FooterPage from "../home-components/FooterPage";
import Header from "../home-components/Header";
import EstablishedBusiness from "./EstablishedBusiness";
import FirstIndustry from "./FirstIndustry";
import Journey from "./Journey";
import TheCertificate from "./TheCertificate";
import '../responsiveness/JourneyPage.css'
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function JourneyComponents(){
    useScrollAnimation();

    return(
        <>
            <Header />
            <div className="animation">
                <Journey />
            </div>
            <div className="animation">
                <FirstIndustry />
            </div>
            <div className="animation">
                <TheCertificate />
            </div>
            <div className="animation">
                <EstablishedBusiness />
            </div>
            <div className="animation">
                <FooterPage />
            </div>
        </>
    );
}