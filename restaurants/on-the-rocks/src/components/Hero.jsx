import { motion } from 'framer-motion'
import { ChevronDown, MapPin, Phone } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function Hero({ onBook }) {
  const hasVideo = Boolean(restaurant.heroVideo && restaurant.heroVideo.trim() !== '')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: video (if provided) or image with slow zoom */}
      <div className="absolute inset-0 z-0">
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={restaurant.heroImage || undefined}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={restaurant.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
            style={{
              backgroundImage: `url('${restaurant.heroImage || '/src/assets/images/placeholder-food.svg'}')`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
            Welcome to
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow">
            {restaurant.name}
          </h1>
          <p className="text-xl md:text-2xl text-secondary/90 mb-8 font-light">
            {restaurant.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <button
            onClick={onBook}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-light font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
          >
            Book a Table
          </button>
          <a
            href="#menu"
            className="px-8 py-4 border-2 border-light/30 hover:border-accent text-light font-semibold rounded-full transition-all hover:bg-light/10"
          >
            View Menu
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-secondary/80"
        >
          <a href={`tel:${restaurant.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone size={16} />
            {restaurant.phone}
          </a>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-2">
            <MapPin size={16} />
            {restaurant.location}
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-light/60 hover:text-accent transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.a>
    </section>
  )
}

export default Hero
