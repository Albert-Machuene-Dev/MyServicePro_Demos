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
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Black card behind logo */}
          <div className="bg-black/90 border border-white/10 rounded-3xl px-8 py-10 md:px-14 md:py-14 mb-10 inline-block max-w-3xl mx-auto backdrop-blur-sm">
            <p className="text-white/60 font-medium tracking-[0.3em] uppercase mb-6 text-sm md:text-base">
              Welcome to
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light">
              {restaurant.tagline}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <button
            onClick={onBook}
            className="px-8 py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-white/20"
          >
            Plan Your Tour
          </button>
          <a
            href="#menu"
            className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-full transition-all hover:bg-white/10"
          >
            Explore Tours
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-secondary/80"
        >
          <a href={`tel:${restaurant.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={16} />
            {restaurant.phone}
          </a>
          <span className="hidden sm:inline text-white/30">|</span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors"
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
