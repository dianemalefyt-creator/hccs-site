import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Documents from './pages/Documents'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assess" element={<Assessment />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}
