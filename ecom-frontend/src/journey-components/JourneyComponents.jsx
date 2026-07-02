import FooterPage from "../home-components/FooterPage";
import Header from "../home-components/Header";
import EstablishedBusiness from "./EstablishedBusiness";
import FirstIndustry from "./FirstIndustry";
import Journey from "./Journey";
import TheCertificate from "./TheCertificate";

export default function JourneyComponents(){
    return(
        <>
            <Header />
            <Journey />
            <FirstIndustry />
            <TheCertificate />
            <EstablishedBusiness />
            <FooterPage />
        </>
    );
}