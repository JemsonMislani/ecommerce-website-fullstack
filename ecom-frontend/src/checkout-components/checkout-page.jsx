import './checkout-page.css'
import CheckoutForm from './customer-details'
import './customer-details.css'

export default function CheckoutPage(){
    const { cxform, errors, clientForm, validation } = CheckoutForm();

    const submitForm = async(e) => {
        e.preventDefault()
        if(!validation()){
            return;
        }

        const orderData = {
            customer: cxform,
        }

        localStorage.setItem('lastOrder', JSON.stringify(orderData));
    }

    return(
        <div className="checkout-page">
            <header className="checkout-top">
                <img
                    src="../images/stepmatters-logo.jpg"
                    className="checkout-logo"
                    alt="Step Matters"
                />
            </header>
            <form onSubmit={submitForm}>
                <div className="checkout-wrapper">
                    <section className="timeline">
                        <div className="checkout-step">
                            <div className="step-content">
                                <h2>
                                    Contact Email
                                </h2>
                                <div className="input-box">
                                    <input 
                                        className={errors.email ? 'input-error' : ''}
                                        name='email'
                                        value={cxform.email}
                                        onChange={clientForm}
                                        placeholder=" "
                                        type="email"
                                    />
                                    <label>Email address</label>
                                    <small className='error'>{errors.email}</small>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-step">
                            <div className="step-content">
                                <h2>
                                    Shipping Details
                                </h2>
                                <div className="grid-two">
                                    <div className="input-box">
                                        <input 
                                            className={errors.first ? 'input-error' : ''}
                                            name='first'
                                            value={cxform.name}
                                            onChange={clientForm}
                                            placeholder=" "
                                            type='text'/>
                                        <label>
                                            First name
                                        </label>
                                        <small className='error'>{errors.first}</small>
                                    </div>
                                    <div className="input-box">
                                        <input 
                                            className={errors.last ? 'input-error' : ''}
                                            name='last'
                                            value={cxform.last}
                                            onChange={clientForm}
                                            placeholder=" "
                                            type='text'/>
                                        <label>
                                            Last name
                                        </label>
                                        <small className='error'>{errors.last}</small>
                                    </div>
                                </div>
                                <div className="input-box">
                                        <input 
                                            className={errors.address ? 'input-error' : ''}
                                            name='address'
                                            value={cxform.address}
                                            onChange={clientForm}
                                            placeholder=" "
                                            type='text'/>
                                        <label>
                                            Complete address
                                        </label>
                                        <small className='error'>{errors.address}</small>
                                </div>
                                <div className="grid-three">
                                    <div className="input-box">
                                        <input 
                                            className={errors.city ? 'input-error' : ''}
                                            name='city'
                                            value={cxform.city}
                                            onChange={clientForm}
                                            placeholder=" "
                                            type='text'/>
                                        <label>
                                            City
                                        </label>
                                        <small className='error'>{errors.city}</small>
                                    </div>
                                    <div className="input-box">
                                        <input 
                                            className={errors.postal ? 'input-error' : ''}
                                            name='postal'
                                            value={cxform.postal}
                                            onChange={clientForm}
                                            placeholder=" "
                                            type='text'/>
                                        <label>
                                            Postal code
                                        </label>
                                        <small className='error'>{errors.postal}</small>
                                    </div>
                                    <div className="input-box">
                                        <input 
                                            className={errors.region ? 'input-error' : ''}
                                            name='region'
                                            value={cxform.region}
                                            onChange={clientForm}
                                            placeholder=" "
                                            type='text'/>
                                        <label>
                                            Region
                                        </label>
                                        <small className='error'>{errors.region}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-step">
                            <div className="step-content">
                                <h2>
                                    Payment Method
                                </h2>
                                <label className='transactions'>All transactions are secure and encrypted.</label>
                                <div>
                                    <small className='error'>{errors.payment}</small>
                                </div>
                                <div className="payment-list">
                                    <label className="payment-item">
                                        <input 
                                            type="radio"
                                            name="payment"
                                            value='GCash'
                                            checked={cxform.payment === 'GCash'}
                                            onChange={clientForm}
                                        />
                                        <div>
                                            <strong>
                                                GCash
                                            </strong>
                                            <small>
                                                Instant payment
                                            </small>
                                        </div>
                                    </label>
                                    <label className="payment-item">
                                        <input 
                                            type="radio"
                                            name="payment"
                                            value='Maya'
                                            checked={cxform.payment === 'Maya'}
                                            onChange={clientForm}
                                        />
                                        <div>
                                            <strong>
                                                Maya
                                            </strong>
                                            <small>
                                                Digital wallet
                                            </small>
                                        </div>
                                    </label>
                                    <label className="payment-item">
                                        <input 
                                            type="radio"
                                            name="payment"
                                            value='Bank Transfer'
                                            checked={cxform.payment === 'Bank Transfer'}
                                            onChange={clientForm}
                                        />
                                        <div>
                                            <strong>
                                                Bank Transfer
                                            </strong>
                                            <small>
                                                Manual confirmation
                                            </small>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                    <aside className="order-card">
                        <h2>
                            Your Order
                        </h2>
                        <div className="product">
                            <div className="product-image">
                            </div>
                            <div>
                                <h3>
                                    Step Matters
                                </h3>
                                <p>
                                    Size: —
                                </p>
                            </div>
                            <strong>
                                ₱0
                            </strong>
                        </div>
                        <div className="line"></div>
                        <div className="price-row">
                            <span>
                                Subtotal
                            </span>
                            <span>
                                ₱0
                            </span>
                        </div>
                        <div className="price-row">
                            <span>
                                Shipping
                            </span>
                            <span>
                                Free
                            </span>
                        </div>
                        <div className="total">
                            <span>
                                Total
                            </span>
                            <strong>
                                ₱0
                            </strong>
                        </div>
                        <button 
                            type='submit'
                            className="order-button">
                            Place Order
                        </button>
                    </aside>
                </div>
            </form>
        </div>
    )
}