import Header from "../home-components/Header.jsx";
import BlogResult from "./BlogResult.jsx";
import useScrollAnimation from "../scrollAnimation/scrollAnimation.jsx";

export default function BlogClicked() {
    useScrollAnimation()
    return(
        <>
            <Header />
            <div className='animation'>
                <BlogResult />
            </div>
        </>
    );
}
