import { useEffect } from 'react';
import './SectionPage.css'
import axios from 'axios'
import { useState } from 'react';
import { useToast } from '../context/cartToast';
import { useCart } from '../context/cartCount';

export default function SectionPage(){
    const [products, setProducts] = useState([])
    const whiteSock = products[0];
    const blackSock = products[1];
    const { showAddedAlert } = useToast()
    const { updateCartCount } = useCart();

    useEffect(() => {
        axios.get('http://localhost:5000/getProductData')
        .then(result => {
            setProducts(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleAddToCartBtn = (product, variantId) => {
        const guestToken = localStorage.getItem('guest-token')
        axios.post('http://localhost:5000/addtoCart', {
            guest_token: guestToken,
            prod_id: product.id,
            variant_id: variantId,
            item_quantity: 1
        })
        .then(result => {
            console.log(result.data)
            showAddedAlert({
            message: "✓ Added to cart",
            image: product.prod_img,
            name: product.prod_name,
            price: product.prod_price,
            item_quantity: 1,
            subtotal: Number(product.prod_price) * 1
        });

        axios.get(`http://localhost:5000/getCartCount/${guestToken}`)
        .then(result => {
            updateCartCount(result.data.cartTotal);
        });
        
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <>
        <div>
            <section id='footwear'>
                <h1 className='footwear'>Footwear</h1>
                <div className='footwear-elements'>
                    <div className='boxOne'>
                        {
                            whiteSock && (
                                <div className='boxOneAandB'>
                                    <div className='boxOneA'>
                                        <p className='white-sock-paragraph-desc'>
                                            {whiteSock.prod_desc}
                                        </p>
                                        <p className='paragraph-motiv'>
                                            For those who show up everyday, it counts.
                                        </p>
                                        <p className='sock-size'>mid size</p>
                                        <p className='sock-price'>Php: ₱{whiteSock.prod_price}</p>
                                        <button
                                            onClick={() => handleAddToCartBtn(whiteSock, 1)}
                                            className='addtocart-button'>Add to cart
                                        </button>
                                    </div>
                                    <div className='boxOneB'>
                                        <img 
                                            className='whitesock-img'
                                            src={`/images/${whiteSock.prod_img}`} alt="" />
                                        <p className='white-sock-desc'>{whiteSock.prod_name}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='boxTwo'>
                        {
                            blackSock && (
                                <div className='boxTwoAandB'>
                                    <div className='boxTwoA'>
                                        <img 
                                        className='blacksock-img'
                                            src={`/images/${blackSock.prod_img}`} alt="" />
                                        <p className='black-sock-desc'>{blackSock.prod_name}</p>
                                    </div>
                                    <div className='boxTwoB'>
                                        <p className='black-sock-paragraph-desc'>
                                            {blackSock.prod_desc}
                                        </p>
                                        <p className='paragraph-motiv'>
                                            For those who show up everyday, it counts.
                                        </p>
                                        <p className='sock-size'>mid size</p>
                                        <p className='sock-price'>Php: ₱{blackSock.prod_price}</p>
                                        <button
                                            onClick={() => handleAddToCartBtn(blackSock, 2)}
                                            className='addtocart-button'>Add to cart
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}