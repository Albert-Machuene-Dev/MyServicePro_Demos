import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import GallerySection from './components/GallerySection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import BookingModal from './components/BookingModal'
import FloatingCTA from './components/FloatingCTA'
import Footer from './components/Footer'
import SplashWrapper from './components/LoadingScreen'
import Header from './components/Header'
import restaurant from './data/restaurant.json'

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [demoNotice, setDemoNotice] = useState(false)

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement
    Object.entries(restaurant.theme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
    document.title = `${restaurant.name} | Demo`
  }, [])

  const showDemoNotice = () => {
    setDemoNotice(true)
    setTimeout(() => setDemoNotice(false), 3000)
  }

  return (
    <SplashWrapper>
      <div className="min-h-screen bg-dark text-light">
        <Header />
        <Hero onBook={() => setIsBookingOpen(true)} />
        <MenuSection onOrder={() => setIsBookingOpen(true)} />
        <GallerySection />
        <AboutSection />
        <ContactSection />
        <Footer />
        
        <FloatingCTA onClick={() => setIsBookingOpen(true)} />
        
        {isBookingOpen && (
          <BookingModal 
            onClose={() => setIsBookingOpen(false)} 
            onDemoNotice={showDemoNotice}
          />
        )}

        {/* Demo-only notice toast */}
        {demoNotice && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass rounded-full text-sm font-medium animate-bounce">
            This is a demo — booking not active yet
          </div>
        )}
      </div>
    </SplashWrapper>
  )
}

export default App
