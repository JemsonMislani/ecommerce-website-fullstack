import { useNavigate } from 'react-router-dom';
import './ShopPage.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { formatPhp } from '../utils/formatPeso';

export function ShopPage() {
    const [shopData, setShopData] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/joinQuery')
        .then(result => {
            setShopData(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    return(
        <>
            <div className='shop-elements'>
                <h1 className='shop'>All products</h1>
            </div>
            <div className='shop-page'>
                <div className='shop-container'>
                    {shopData.map((item) => (
                        <div 
                            className='all-products-card'
                            key={item.id}
                            onClick={() => nav(`/clicked-item/${item.id}`)}>
                            <img 
                                className='shop-img default'
                                src={`/images/${item.shop_prod_img}`} alt="" />
                            <img
                                className='shop-img hover' 
                                src={`/images/${item.prod_img_hover}`} alt="" />
                            <p className='shop-name'>{item.prod_name}</p>
                            <p className='shop-price'>₱{formatPhp(item.prod_price)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}