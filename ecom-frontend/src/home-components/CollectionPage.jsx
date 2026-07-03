import { Link } from 'react-router-dom';
import './CollectionPage.css';

export default function CollectionPage() {
    return(
        <>
        <div className="collection-elements">
            <h1 className='collection'>Collection</h1>
            <div className='collection-boxes'>
                <div className='collection-all-products'>
                    <div className='overlay-collection'>
                        <Link 
                            className='all-products-link'
                            to='/shop'>All products</Link>
                    </div>
                    <img 
                        className='collection-all-products-img'
                        src="/images/Collection-all-products.jpg" alt="" />
                </div>
                <div className='collection-all-footwear'>
                    <div className='overlay-collection'>
                        <Link 
                            className='all-footwear-link'
                            to='#footwear'>Footwear</Link>
                    </div>
                    <img 
                        className='collection-all-footwear-img'
                        src="/images/Collection-footwear.jpg" alt="" />
                </div>
            </div>
        </div>
        </>
    );
}