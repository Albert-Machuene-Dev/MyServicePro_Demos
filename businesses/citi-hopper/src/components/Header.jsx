import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MapPin, Phone, Clock, Mail } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Services', href: '#menu' },
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
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0 max-w-[60%]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/assets/images/logo-white.png"
              alt={restaurant.name}
              className="h-5 md:h-10 w-auto"
            />
          </a>

          {/* Menu Button Only */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors shrink-0 shadow-lg mr-2"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Slide-out Navigation + Info */}
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
              className="absolute right-0 top-0 bottom-0 w-full bg-black border-l border-white/10 p-6 md:p-8 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
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

              {/* Navigation */}
              <nav className="space-y-2 mb-10">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => scrollTo(item.href)}
                    className="block w-full text-left px-5 py-3 text-lg text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Info Section */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-white/40 text-xs uppercase tracking-widest mb-6">
                  Company Info
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-white mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-white/50 text-sm">Address</p>
                      <p className="text-white text-sm">{restaurant.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="text-white mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-white/50 text-sm">Phone</p>
                      <a href={`tel:${restaurant.phone}`} className="text-white text-sm hover:underline">
                        {restaurant.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="text-white mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-white/50 text-sm">Email</p>
                      <a href={`mailto:${restaurant.email}`} className="text-white text-sm hover:underline">
                        {restaurant.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-white mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-white/50 text-sm">Hours</p>
                      {restaurant.hours.map((hour) => (
                        <p key={hour.day} className="text-white text-sm">
                          {hour.day}: {hour.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/30 text-xs text-center">
                    Demo website — booking not active
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
