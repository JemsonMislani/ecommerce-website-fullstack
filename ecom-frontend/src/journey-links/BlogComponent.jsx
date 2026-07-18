import FooterPage from '../home-components/FooterPage';
import Header from '../home-components/Header';
import BlogLink from './Bloglink';
import useScrollAnimation from '../scrollAnimation/scrollAnimation';

export default function BlogComponent() {
    useScrollAnimation()
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