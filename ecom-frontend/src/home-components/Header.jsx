import { Link } from "react-router-dom";
import './Header.css'
import { FaShoppingBag, FaSearch, FaUser } from 'react-icons/fa'

export default function Header(){
    return(
        <>
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
                            <Link className='shop-link' to='/shop-page'>Shop</Link>
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
                            className="cart-icon">
                            <FaShoppingBag />
                            <span
                                className="cart-quantity">
                            </span>
                        </Link>
                    </h3>
                </div>
            </div>
        </>
    );
}