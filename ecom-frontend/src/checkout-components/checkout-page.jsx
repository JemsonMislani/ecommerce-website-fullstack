import './checkout-page.css'

export default function CheckoutPage(){

    return(
        <div className="checkout-page">
            <header className="checkout-top">
                <img
                    src="../images/stepmatters-logo.jpg"
                    className="checkout-logo"
                    alt="Step Matters"
                />
            </header>
            <div className="checkout-wrapper">
                <section className="timeline">
                    <div className="checkout-step">
                        <div className="step-content">
                            <h2>
                                Contact Email
                            </h2>
                            <div className="input-box">
                                <input 
                                    placeholder=" "
                                    type="email"
                                />
                                <label>
                                    Email address
                                </label>
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
                                    <input placeholder=" "/>
                                    <label>
                                        First name
                                    </label>
                                </div>
                                <div className="input-box">
                                    <input placeholder=" "/>
                                    <label>
                                        Last name
                                    </label>
                                </div>
                            </div>
                            <div className="input-box">
                                <input placeholder=" "/>
                                <label>
                                    Complete address
                                </label>
                            </div>
                            <div className="grid-three">
                                <div className="input-box">
                                    <input placeholder=" "/>
                                    <label>
                                        City
                                    </label>
                                </div>
                                <div className="input-box">
                                    <input placeholder=" "/>
                                    <label>
                                        Postal code
                                    </label>
                                </div>
                                <div className="input-box">
                                    <input placeholder=" "/>
                                    <label>
                                        Region
                                    </label>
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
                            <div className="payment-list">
                                <label className="payment-item">
                                    <input 
                                        type="radio"
                                        name="payment"
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
                    <button className="order-button">
                        Place Order
                    </button>
                </aside>
            </div>
        </div>
    )
}