import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export default function ScrollToTop () {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const resetScroll = () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflow = '';

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });   
        }
        resetScroll();

        if(hash) {
            setTimeout(() => {
                const elem = document.querySelector(hash);
                if(elem) {
                    elem.scrollIntoView();
                }
            }, 100)
        }
    }, [pathname, hash])


    return null;
}