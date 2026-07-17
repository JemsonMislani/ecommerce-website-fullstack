import { useEffect, useState } from 'react';
import './Header-cart-page.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatPhp } from '../utils/formatPeso';
import { useCart } from '../context/cartCount';

export function CartPage() {
    const [itemInsideCart, setItemInsideCart] = useState([])
    const nav = useNavigate();
    const { cartCount, updateCartCount } = useCart();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const guestToken = localStorage.getItem('guest-token');
    if(token){
        axios.get('http://localhost:5000/getUserCart', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setItemInsideCart(result.data);
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        axios.get(`http://localhost:5000/getAddedItemsInCart/${guestToken}`)
        .then(result => {
            setItemInsideCart(result.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
}, []);

    const updateQuantityBtn = (item, quantity) => {
        axios.patch(
            `http://localhost:5000/cart/items/${item.cart_id}`,
            { quantity }
        )
        .then(result => {
            if(result.data.removed){
                setItemInsideCart(prev =>
                    prev.filter(
                        cartItem => cartItem.cart_id !== item.cart_id
                    )
                );
            } else {
                setItemInsideCart(prev =>
                    prev.map(cartItem =>
                        cartItem.cart_id === item.cart_id
                            ? result.data
                            : cartItem
                    )
                );
            }
                displayCount();
        })
        .catch(err => {
            console.log(err.response.data.message);
        });
    };

    const displayCount = () => {
        const token = localStorage.getItem('token');
        const guestToken = localStorage.getItem('guest-token');
    if(token){
        axios.get('http://localhost:5000/getUserCartCount', {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(result => {
            updateCartCount(result.data.cartTotal);
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        axios.get(`http://localhost:5000/getAddedItemsInCart/${guestToken}`)
        .then(result => {
            const count = result.data.reduce(
                (total, item) => total + item.item_quantity,
                0
            );
            updateCartCount(count);
        })
        .catch(err => {
            console.log(err);
        });
    }
}
        useEffect(() => {
            displayCount()
        }, [])

    const checkoutBtn = async () => {
        if(itemInsideCart.length === 0){
            alert('No item in cart 🛒');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            let result;
            if(token){
                result = await axios.post(
                    'http://localhost:5000/createShopifyCheckoutUser',
                    {},
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                const guestToken = localStorage.getItem('guest-token');

                result = await axios.post(
                `http://localhost:5000/createShopifyCheckout/${guestToken}`
            );
}
            window.location.href = result.data.checkoutUrl;
        } catch(error) {
            console.log(error.response?.data || error.message);
            alert("Checkout failed");
        }
    }

    return(
    <>
        <div className='container'>
            <div className='column'>
                <div className='cart-count'>
                    <div className="shop-cart">
                        Your shopping cart
                    </div>
                    <span
                        className='counts-in-cartpage'
                        >Items ({cartCount})</span>
                </div>
                {
                    itemInsideCart.length === 0 && <p className='empty-cart'>Empty cart 🛒</p>
                }
                {
                    itemInsideCart.map((item) => (
                    <div
                        key={item.cart_id} 
                        className='cart-elements'>
                    <div className='img-details'>
                        <div className='cart-image'>
                                <img src={`/images/${item.shop_prod_img}`} alt="" />
                            </div>
                            <div className='cart-names'>
                                <h3>{item.prod_name}</h3>
                                <p className='product-size'>{item.prod_size}</p>
                                <p className='product-price'>₱{formatPhp(item.prod_price)} </p>
                        </div>
                    </div>
                        <div className='quantity-total-remove'>
                            <div className='cart-quant'>
                                <button 
                                    onClick={() => updateQuantityBtn(item, item.item_quantity - 1)}
                                    className='minus-button'>-</button>
                                <p className='product-quant'>Quantity:</p>
                                <input 
                                    className='inp' 
                                    type="text" 
                                    value={item.item_quantity}
                                    readOnly/>
                                <button 
                                    onClick={() => updateQuantityBtn(item, item.item_quantity + 1)}
                                    className='add-button'>+</button>
                            </div>
                            <div className='cart-total'>
                                <div   
                                className='product-total'>Total:</div>
                                <div>₱{formatPhp(item.subtotal)}</div>
                            </div>
                            <div 
                                onClick={() => updateQuantityBtn(item, 0)}
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
                    {formatPhp(
                        itemInsideCart
                        .reduce((total, item) => total + Number(item.subtotal), 0)
                    )}
                </h1>
                <p className="taxesandshipping">Excluding taxes and shipping</p>
                <div className='checkout-backtoshop'>
                    <button
                        onClick={checkoutBtn}
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