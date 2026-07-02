import './SectionPage.css'

export default function SectionPage(){
    return(
        <>
        <div>
            <section id='footwear'>
                <h1 className='footwear'>Footwear</h1>
                <div className='footwear-elements'>
                    <div className='boxOne'>
                        <div className='boxOneAandB'>
                            <div className='boxOneA'>
                                <p className='white-sock-paragraph-desc'>
                                    Clean, classic, and ready for your grind, built discipline in every step.
                                </p>
                                <p className='paragraph-motiv'>
                                    For those who show up everyday, it counts.
                                </p>
                                <p className='sock-size'>mid size</p>
                                <p className='sock-price'>Php: ₱189.00</p>
                                <button
                                    className='addtocart-button'>Add to cart
                                </button>
                            </div>
                            <div className='boxOneB'>
                                <img 
                                    className='whitesock-img'
                                    src="/images/Whitesock.jpg" alt="" />
                                <p className='white-sock-desc'>Jem white sock 1.0</p>
                            </div>
                        </div>
                    </div>
                    <div className='boxTwo'>
                        <div className='boxTwoAandB'>
                            <div className='boxTwoA'>
                                <img 
                                className='blacksock-img'
                                    src="/images/Blacksock.jpg" alt="" />
                                <p className='black-sock-desc'>Jem black sock 1.0</p>
                            </div>
                            <div className='boxTwoB'>
                                <p className='black-sock-paragraph-desc'>
                                    Black shade that helps you step confidently into every challenges.
                                </p>
                                <p className='paragraph-motiv'>
                                    For those who show up everyday, it counts.
                                </p>
                                <p className='sock-size'>mid size</p>
                                <p className='sock-price'>Php: ₱189.00</p>
                                <button
                                    className='addtocart-button'>Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}