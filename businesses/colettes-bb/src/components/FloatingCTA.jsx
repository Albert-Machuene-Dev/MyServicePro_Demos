import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

function FloatingCTA({ onClick }) {
  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-full shadow-lg shadow-white/20 transition-all hover:scale-105"
    >
      <Calendar size={20} />
      <span className="hidden sm:inline">Book Now</span>
    </motion.button>
  )
}

export default FloatingCTA
