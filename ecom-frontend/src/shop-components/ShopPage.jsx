import { useNavigate } from 'react-router-dom';
import { products } from '../datas/ShopPageProducts.js';
import './ShopPage.css';

export function ShopPage() {
    const nav = useNavigate();
    const shopData = products;

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
                            onClick={() => nav(`/product/${item.id}`)}>
                            <img 
                                className='shop-img default'
                                src={item.image} alt="" />
                            <img
                                className='shop-img hover' 
                                src={item.hoverImg} alt="" />
                            <p className='shop-name'>{item.name}</p>
                            <p className='shop-price'>₱{item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}