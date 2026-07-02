import { businessData } from '../datas/Journey-BusinessLink';
import './BusinessLink.css'
export default function BusinessLink() {
    const business = businessData;

    return(
        <>
            <div className='business-elements'>
                <h1 className='business'>Businesses</h1>
                <div className='business-container'>
                    {business.map((item) => (
                        <div key={item.id}>
                            <p className='business-industry'>{item.industry}</p>
                            <p className='business-date'>{item.date}</p>
                            <img 
                                className='business-img'
                                src={item.img} alt="" />
                            <p className='business-description'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}