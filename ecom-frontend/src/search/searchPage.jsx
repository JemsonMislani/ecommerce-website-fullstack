import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import { formatPhp } from "../utils/formatPeso";
import "./searchPage.css";

export default function SearchPage() {
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [searchInp, setSearchInp] = useState(query);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!query.trim()) {
            setProducts([]);
            return;
        }

        axios.get(`http://localhost:5000/joinQuery?query=${encodeURIComponent(query)}`)
            .then(res => setProducts(res.data))
            .catch(console.error);
        }, [query]);

        const searchProds = () => {
        const value = searchInp.trim();
        if (!value){
            return;
        }
        nav(`/search-page?query=${encodeURIComponent(value)}`);
    };

    useEffect(() => {
        setSearchInp(query);
    }, [query]);

    return (
    <>
        <Header />
            <div className="searched-product-elements">
                <div className="search-name-header">
                    <h1>Search</h1>
                </div>
                <div className="search-input-button">
                    <input
                        className="search-product-input"
                        type="text"
                        value={searchInp}
                        onChange={(e) => setSearchInp(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchProds()}
                        placeholder="Search products..."
                    />
                    <button
                        className="search-product-button"
                        onClick={searchProds}
                    >
                        Search
                    </button>
                </div>
                <div className="shop-page-search">
                    <div className="shop-container-search">

                        {query.trim() === "" ? null : products.length > 0 ? (
                            products.map((prod) => (
                                <div 
                                    className='all-products-card-search'
                                    key={prod.id}
                                    onClick={() => nav(`/clicked-item/${prod.id}`)}>
                                    <img 
                                        className='shop-img-search default'
                                        src={`/images/${prod.shop_prod_img}`} alt="" />
                                    <img
                                        className='shop-img-search hover' 
                                        src={`/images/${prod.prod_img_hover}`}alt="" />
                                    <p className='shop-name-search'>{prod.prod_name}</p>
                                    <p className='shop-price-search'>₱{formatPhp(prod.prod_price)}</p>
                                </div>
                            ))
                        ) : (
                            (<div className='no-result'>Oops! We couldn't find any products matching ' {query} '
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        <FooterPage />
    </>
    );
}