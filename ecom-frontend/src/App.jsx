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

export default function App() {

  return (
    <>
    <BrowserRouter>
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
        <Route path='blog-link' element={<BlogComponent />}/>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}