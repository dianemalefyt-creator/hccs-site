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
import Tools from './pages/Tools'
import { GuidedWorkflow, Workspace } from './pages/Workflow'
import BusinessCase from './pages/BusinessCase'
import { BlogList, BlogPost } from './pages/Blog'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import { PricingPage } from './components/ProGate'
import Admin from './pages/Admin'
import Documents from './pages/Documents'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin'
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {!isAdmin && <Nav />}
      <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assess" element={<QuickAssess />} />
        <Route path="/assess/full" element={<Assessment />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rights" element={<BillOfRights />} />
        <Route path="/org-rights" element={<OrgBillOfRights />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/workflow" element={<GuidedWorkflow />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/business-case" element={<BusinessCase />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatWidget />}
    </>
  )
}
