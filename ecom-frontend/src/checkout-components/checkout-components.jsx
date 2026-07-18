import CheckoutPage from './checkout-page';
import useScrollAnimation from '../scrollAnimation/scrollAnimation';

export default function Checkout(){
    useScrollAnimation()
    return(
        <>
        <div className='animation'>
            <CheckoutPage />
        </div>
        </>
    );
}