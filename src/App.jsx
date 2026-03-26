import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import QuickAssess from './pages/QuickAssess'
import Assessment from './pages/Assessment'
import Controls from './pages/Controls'
import Contact from './pages/Contact'
import BillOfRights from './pages/BillOfRights'
import OrgBillOfRights from './pages/OrgBillOfRights'
import Templates from './pages/Templates'
import BusinessCase from './pages/BusinessCase'
import { BlogList, BlogPost } from './pages/Blog'
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
        <Route path="/assess" element={<QuickAssess />} />
        <Route path="/assess/full" element={<Assessment />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rights" element={<BillOfRights />} />
        <Route path="/org-rights" element={<OrgBillOfRights />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/business-case" element={<BusinessCase />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </>
  )
}
