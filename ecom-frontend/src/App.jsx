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
import Cart from './cart-components/cart'
import Checkout from './checkout-components/checkout-components'
import CheckoutPage from './checkout-components/checkout-page'
import Register from './register/register-component'
import AccountPage from './register/user-account'
import LoginForm from './register/login-form'
import RegisterFormComponent from './register/signup-component'
import OrdersPage from './register/user-account-page-orders'
import AddressPage from './register/user-account-page-address'

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

        { /* FOR CHECKOUT PAGE */}
        <Route path='/checkout' element={<CheckoutPage />}/>
        <Route path='/checkout-page' element={<Checkout />}/>

        { /* FOR LOGIN AND REGISTER ACCOUNT */}
        <Route path='/login' element={<Register />}/>
        <Route path='/login-form' element={<LoginForm />}/>
        <Route path='register-form' element={<RegisterFormComponent />}/>
        <Route path='user-account-page/orders' element={<OrdersPage/>} />
        <Route path='user-account-page/address' element={<AddressPage/>}/>

        { /* Navigate to users account page */ }
        <Route path='user-account-page' element={<AccountPage />}/>

      </Routes>
    </div>
    </CartToastProvider>
    </CartCountProvider>
    </BrowserRouter>
    </>
  )
}