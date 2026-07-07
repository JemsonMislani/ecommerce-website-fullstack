import whiteSockImages from '../assets/Shop-white-sock.jpg';
import whiteSockForHover from '../assets/white-for-hover.jpg';
import whiteSlider1 from '../assets/White-slider-one.jpg';
import whiteSlider2 from '../assets/White-slider-two.jpg';
import whiteSlider3 from '../assets/White-slider-three.jpg';
import whiteSlider4 from '../assets/White-slider-four.jpg';

import blackSockImages from '../assets/Shop-black-shop.jpg';
import blackSockForHover from '../assets/black-for-hover.jpg'
import blackSlider1 from '../assets/Black-slider-one.jpg';
import blackSlider2 from '../assets/Black-slider-two.jpg';
import blackSlider3 from '../assets/Black-slider -three.jpg';
import blackSlider4 from '../assets/Black-slider-four.jpg';

export const products = [{
    id: 1,
    image: whiteSockImages,
    hoverImg: whiteSockForHover,
    name: 'Jem White sock 1.0',
    price: 189.00,
    size: 'Mid size',
    sliderImages: [
        whiteSockImages,
        whiteSlider1,
        whiteSlider2,
        whiteSlider3,
        whiteSlider4
],
    description: [
        '- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, modi?',
        '- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, modi. sit amet consectetur adipisicing?',
        '- sit amet consectetur adipisicing. sit amet consectetur adipisicing, sit amet consectetur adipisicing. sit amet consectetur adipisicing,sit amet consectetur adipisicing. sit amet consectetur adipisicing'
    ]
}, {
    id: 2,
    image: blackSockImages,
    hoverImg: blackSockForHover,
    name: 'Jem Black sock 1.0',
    price: 189.00,
    size: 'Mid size',
    sliderImages: [
        blackSockImages,
        blackSlider1,
        blackSlider2,
        blackSlider3,
        blackSlider4
], 
description: [
        '- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, modi?',
        '- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, modi. sit amet consectetur adipisicing?',
        '- sit amet consectetur adipisicing. sit amet consectetur adipisicing, sit amet consectetur adipisicing. sit amet consectetur adipisicing, sit amet consectetur adipisicing. sit amet consectetur adipisicing'
    ]
}]
