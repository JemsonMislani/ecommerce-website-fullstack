import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home-components/Home'
import Header from './home-components/Header'
import HomeSlider from './home-components/HomeSliderImages'
import SectionPage from './home-components/SectionPage'
import CollectionPage from './home-components/CollectionPage'
import AboutUs from './home-components/AboutUs'
import FooterPage from './home-components/FooterPage'
import JourneyComponents from './journey-components/JourneyComponents'
import BlogComponent from './journey-links/BlogComponent'
import BlogClicked from './journey-links/BlogClicked'
import BusinessComponent from './journey-links/BusinessComponent'
import Shop from './shop-components/ShopComponents'
import ClickedItem from './shop-components/ShopClickedItem'
import ScrollToTop from './scroll-behavior/ScrollToTopBehavior'
import ScrollMedia from './scroll-behavior/ScrollMedia'
import Guest from './guest-token-provider/guest'
import { CartToastProvider } from './context/cartToast'
import { CartCountProvider } from './context/cartCount'
import { CartPage } from './cart-components/Header-cart-page'
import Cart from './cart-components/cart'
import Checkout from './checkout-components/checkout-components'
import CheckoutPage from './checkout-components/checkout-page'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <CartCountProvider>
    <CartToastProvider>
    <ScrollToTop />
    <ScrollMedia />
    <div>
        { /* guest-token */}
        <Guest />
        
      <Routes>

        {/* HOME WHOLE PAGE */}
        <Route path='/' element={<Home />}/>
        <Route path='/header' element={<Header />}/>
        <Route path='/homeSliderImages' element={<HomeSlider />}/>
        <Route path='/section' element={<SectionPage />}/>
        <Route path='/collection' element={<CollectionPage />}/>
        <Route path='/aboutUs' element={<AboutUs />}/>
        <Route path='/footer' element={<FooterPage />}/>

        {/* JOURNEY WHOLE PAGE */}
        <Route path='/journey' element={<JourneyComponents />} />
        {/* JOURNEY BLOG PAGE */}
        <Route path='/blog-link' element={<BlogComponent />}/>
        <Route path='/blog/:id' element={<BlogClicked />}/>
        {/* JOURNEY BUSINESS PAGE */}
        <Route path='business-link' element={<BusinessComponent />}/>

        {/* FOR WHOLE SHOP PAGE */}
        <Route path='/shop' element={<Shop />}/>
        <Route path='/clicked-item/:id' element={<ClickedItem />}/>
        
        { /* FOR CART PAGE */}
        <Route path='/cart' element={<Cart />}/>
        <Route path='/cart-page' element={<CartPage />}/>

        { /* FOR CHECKOUT PAGE */}
        <Route path='/checkout' element={<CheckoutPage />}/>
        <Route path='/checkout-page' element={<Checkout />}/>

      </Routes>
    </div>
    </CartToastProvider>
    </CartCountProvider>
    </BrowserRouter>
    </>
  )
}