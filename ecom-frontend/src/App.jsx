import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import HomeSlider from './components/HomeSliderImages'
import SectionPage from './components/SectionPage'
import AboutUs from './components/AboutUs'
import FooterPage from './components/FooterPage'

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
        <Route path='/aboutUs' element={<AboutUs />}/>
        <Route path='/footer' element={<FooterPage />}/>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}