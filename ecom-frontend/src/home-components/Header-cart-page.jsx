import { useEffect, useState } from 'react';
import './Header-cart-page.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export function CartPage() {
    const [itemInsideCart, setItemInsideCart] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        const guestToken = localStorage.getItem('guest-token')
        axios.get(`http://localhost:5000/getAddedItemsInCart/${guestToken}`)
        .then(result => {
            setItemInsideCart(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    return(
    <>
        <div className='container'>
            <div className='column'>
                <div className="shop-cart">
                    Your shopping cart
                </div>
                {
                    itemInsideCart.length === 0 && <p className='empty-cart'>Empty cart 🛒</p>
                }
                {
                    itemInsideCart.map((item, index) => (
                    <div
                        key={index} 
                        className='cart-elements'>
                    <div className='img-details'>
                        <div className='cart-image'>
                                <img src={`/images/${item.shop_prod_img}`} alt="" />
                            </div>
                            <div className='cart-names'>
                                <h3>{item.prod_name}</h3>
                                <p className='product-size'>{item.prod_size}</p>
                                <p className='product-price'>₱{item.prod_price} </p>
                        </div>
                    </div>
                        <div className='quantity-total-remove'>
                            <div className='cart-quant'>
                                <button 
                                    className='minus-button'>-</button>
                                <p className='product-quant'>Quantity:</p>
                                <input 
                                    className='inp' 
                                    type="text" 
                                    value={item.item_quantity}
                                    readOnly/>
                                <button 
                                    className='add-button'>+</button>
                            </div>
                            <div className='cart-total'>
                                <div   
                                className='product-total'>Total:</div>
                                <div>₱{(item.subtotal)}</div>
                            </div>
                            <div 
                                className='product-remove'>
                                Remove
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
            <div className="payment-shipping-checkout">
                <h1 className='subtotal'>Subtotal: ₱
                    {
                        itemInsideCart
                        .reduce((total, item) => total + Number(item.subtotal), 0)
                        .toFixed(2)
                    }
                </h1>
                <p className="taxesandshipping">Excluding taxes and shipping</p>
                <div className='checkout-backtoshop'>
                    <button
                        className="checkout">Checkout</button>
                    <button
                        onClick={() => nav('/shop')}
                        className="BTS">Back to shop</button>
                </div>
            </div>
        </div>
    </>
    );
}