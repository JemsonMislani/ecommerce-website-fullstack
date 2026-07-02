import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { homeImg } from '../datas/HomepageSliderImgs.js';
import { homeImgMobile } from '../datas/HomepageSliderImgs.js';
import { useEffect, useState } from 'react';

export default function HomeSlider(){
            const [current, setCurrent] = useState(0);
        const [images, setImages] = useState(() => {
            window.innerWidth >= 480 ? homeImg : homeImgMobile 
        });
    
        const nextSlide = () => {
            setCurrent((current + 1) % images.length);
        };
    
        const prevSlide = () => {
            setCurrent((current - 1 + images.length) % images.length);
        };

        useEffect(() => {
            const desktopSize = () => {
            const desktop = window.innerWidth >= 480;
            const newImg = desktop ? homeImg : homeImgMobile;
            setImages(newImg)
            setCurrent(prev => prev >= newImg.length ? 0 : prev)
        }

        desktopSize();
        window.addEventListener('resize', desktopSize);
        return () => {
            window.removeEventListener('resize', desktopSize);
        }
        }, []);

        if(!images || images.length === 0){
            return null;
        }
    return(
        <>
            <div className='slider'>

                <img className='homepage-main-img' src={images[current]} alt="slider" />

                <button  
                    onClick={nextSlide}
                    className='nextButton'><FaChevronRight/></button>
                <button 
                    onClick={prevSlide}
                    className='prevButton'><FaChevronLeft /></button>
            </div>
        </>
    );
}