import { Link, useNavigate } from "react-router-dom";
import './Header.css'
import { FaShoppingBag, FaSearch, FaUser, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { useCart } from '../context/cartCount';

export default function Header(){
    const [showmenu, setshowMenu] = useState(false);
    const [searchAny, setSearchAny] = useState('');
    const [showsearchbar, setShowSearchBar] = useState(false);
    const scrollRef = useRef(0);
    const nav = useNavigate()
    const { cartCount, updateCartCount } = useCart();

    const searchAnyProds = async() => {
        if(searchAny.trim() !== ''){
            await new Promise (res => setTimeout(res, 2000));
            nav(`/search-page?query=${encodeURIComponent(searchAny)}`)
        }
    }

    useEffect(() => {
        const guestToken = localStorage.getItem('guest-token')
        if(!guestToken){
            return
        }
        axios.get(`http://localhost:5000/getCartCount/${guestToken}`,)
        .then(result => {
            updateCartCount(result.data.cartTotal);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    useEffect(() => {
        if(showmenu) {
            scrollRef.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollPosition = scrollRef.current;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';

            window.scrollTo(0, scrollPosition);
            scrollRef.current = 0;
        }
    }, [showmenu])

    return(
        <>
            <div className="menu-elem">
                <div className={`hamburger-icon ${showmenu ? 'show' : ''}`}
                onClick={() => setshowMenu(!showmenu)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div 
                    className={`overlay ${showmenu ? 'active' : ''}`}
                    onClick={() => setshowMenu(false)}>
                </div>
                <div 
                    className={`menu-opt ${showmenu ? 'active' : ''}`}>
                    <button 
                        className="close-button"
                        onClick={() => setshowMenu(false)}>✕
                    </button>
                    <h1 className="step-matters-menu">Step Matters</h1>
                    <div className="search-user-icon">
                        {showsearchbar && (
                        <input 
                            className="search-word"
                            type="text" 
                            placeholder="Search"
                            value={searchAny}
                            onChange={(e) => setSearchAny(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchAnyProds()}/>
                        )}
                        <h3 
                            className="search-icon"
                            onClick={() => setShowSearchBar(!showsearchbar)}>
                            <FaSearch/>
                        </h3>
                        <h3 className="user-icon"><FaUser /></h3>
                    </div>
                    <Link 
                        className="home-link"
                        to='/'>Home
                    </Link>
                    <Link 
                        className="journey-link"
                        to='/journey'>Journey
                    </Link>
                    <Link 
                        className="blog-link"
                        to='/blog-link'>Blog
                    </Link>
                    <Link 
                        className="business-link"
                        to='/business-link'>Business
                    </Link>
                    <Link 
                        className="shop-link"
                        to='/shop'>Shop
                    </Link>
                    <Link 
                        to='/#footwear'
                        className="footwear-link"
                        >Footwear
                    </Link>       
                    <div className="menu-page-icons">
                        <p><FaFacebook /></p>
                        <p><FaInstagram /></p>
                        <p><FaTwitter /></p>
                    </div>
                </div>
            </div>
            <div className="business-name-header">
                <div className='business-name'>Step Matters</div>
            </div>
            <div className='header-section'>
                <div className='tagline'>
                    Every step counts.
                </div>
                <div className='header-links'>
                    <ul className='drop-links'>
                        <li>
                            <Link className='home-link' to='/'>Home</Link>
                        </li>
                        <li className='forJourney'>
                            <Link className='journey-link' to='/journey'>Journey</Link>
                            <ul className='journey-dropdown'>
                                <li>
                                    <Link 
                                    className='dropdown-blog'
                                    to='/blog-link'>Blog</Link>
                                </li>
                                <li>
                                    <Link
                                    to='/business-link'>Business</Link>
                                </li>
                            </ul>
                        </li>
                        <li className='forShop'>
                            <Link className='shop-link' to='/shop'>Shop</Link>
                            <ul className='shop-dropdown'>
                                <li>
                                    <Link 
                                        to='/#footwear'
                                        className='footwear-link'>Footwear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className='header-icons'>
                    <h3 className="search-icon"><FaSearch/>
                        </h3>
                    <h3 className="user-icon"><FaUser /></h3>
                    <h3 className="faShoppingIcon">
                        <Link
                            to='/cart'
                            className="cart-icon">
                            <FaShoppingBag />
                            <span
                                className="cart-quantity">{cartCount}
                            </span>
                        </Link>
                    </h3>
                </div>
            </div>
        </>
    );
}