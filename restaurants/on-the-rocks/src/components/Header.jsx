import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Info, MapPin, Phone, Clock, Mail } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/assets/images/logo-white.png"
              alt={restaurant.name}
              className="h-8 md:h-10 w-auto"
            />
          </a>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInfo(true)}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Restaurant info"
            >
              <Info size={22} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-black border-l border-white/10 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-12">
                <img
                  src="/assets/images/logo-white.png"
                  alt={restaurant.name}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => scrollTo(item.href)}
                    className="block w-full text-left px-6 py-4 text-xl text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="absolute bottom-8 left-8 right-8 text-white/40 text-sm">
                <p>{restaurant.location}</p>
                <p className="mt-1">{restaurant.phone}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-white/10 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-white">Restaurant Info</h2>
                <button
                  onClick={() => setShowInfo(false)}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="text-white mt-1 shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Address</p>
                    <p className="text-white">{restaurant.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-white mt-1 shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <a href={`tel:${restaurant.phone}`} className="text-white hover:underline">
                      {restaurant.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-white mt-1 shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <a href={`mailto:${restaurant.email}`} className="text-white hover:underline">
                      {restaurant.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-white mt-1 shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Hours</p>
                    {restaurant.hours.map((hour) => (
                      <p key={hour.day} className="text-white">
                        {hour.day}: {hour.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white/40 text-xs">
                  Demo website — booking not active
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
