import { useParams } from 'react-router-dom';
import './ShowItemClicked.css';
import { products } from '../datas/ShopPageProducts';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShowItemClicked() {
        const { id } = useParams();
        const product = products.find(p => p.id === parseInt(id));
        const [currentIndex, setCurrentIndex] = useState(0);
        const [quantity, setQuantity] = useState(1);
        const [shopData, setShopData] = useState([])

        const nextSlideImg = () => {
            setCurrentIndex((item) => (item + 1) % product.sliderImages.length);
        };
    
        const prevSlideImg = () => {
            setCurrentIndex((item) => ( item - 1 + product.sliderImages.length) % product.sliderImages.length);
        };

        useEffect(() => {
            axios.get('http://localhost:5000/joinQuery')
            .then(result => {
                const selectedProd = result.data.find(item => item.id === Number(id))
                setShopData(selectedProd)
            })
            .catch(err => {
                console.log(err)
            }) 
        }, [])

    return(
        <>
            <div className='products-elements'>
                <div className='img-slider-section'>
                    <div className='slider-images'>
                        <img
                            className='image-slider'
                            src={product.sliderImages[currentIndex]} alt={product.name} />
                        <button 
                            className='previous-button'
                            onClick={prevSlideImg}>‹</button>
                        <button 
                            className='next-button'
                            onClick={nextSlideImg}>›</button>
                    </div>
                    <div className='thumbnails-images'>
                        {product.sliderImages.map((img, index) => (
                            <img 
                                key={index}
                                src={img}
                                alt={`thumbnail${index}`}
                                className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}/>
                        ))}
                    </div>
                </div>
                <div className='product-elements'>
                    <div className='product-details'>
                        <h2 className='product-details-name'>{shopData.prod_name}</h2>
                        <p className='product-details-size'>{shopData.prod_size}</p>
                        <p className='product-details-price'>₱{shopData.prod_price}</p>
                        <div className='quantity-option'>
                            <label
                                className='quantity-label'>Quantity:
                            </label>
                            <select 
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}>
                                    {[...Array(9)].map((_, i) => ( <option 
                                        key={i+1}
                                        value={i+1}>{i+1}</option>))}
                            </select>
                        </div>
                        <div>
                            <button
                                className='product-add-button'>Add to cart
                            </button>
                        </div>
                    </div>
                    <div className='description-section'>
                        <div className='product-description'>{shopData?.prod_desc_threelines?.map((desc, index) => (
                            <p key={index}>{desc}</p>
                        ))}</div>
                    </div>
                </div>
            </div>
        </>
    );
}