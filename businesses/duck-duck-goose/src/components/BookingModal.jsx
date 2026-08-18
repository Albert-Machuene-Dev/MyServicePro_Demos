import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Mail, MapPin, Clock } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function BookingModal({ onClose, onDemoNotice }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onDemoNotice()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md glass rounded-2xl p-6 md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary/60 hover:text-light transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Visit Us
        </h2>
        <p className="text-secondary/60 text-sm mb-6">
          This is a demo preview. Buttons are for visual demonstration only.
        </p>

        {/* Store info */}
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-center gap-3 text-secondary/80">
            <MapPin size={16} className="text-white shrink-0" />
            <span>{restaurant.location}</span>
          </div>
          <div className="flex items-center gap-3 text-secondary/80">
            <Clock size={16} className="text-white shrink-0" />
            <span>{restaurant.hours[1].day}: {restaurant.hours[1].time}</span>
          </div>
          <div className="flex items-center gap-3 text-secondary/80">
            <Mail size={16} className="text-white shrink-0" />
            <a href={`mailto:${restaurant.email}`} className="hover:text-white transition-colors">
              {restaurant.email}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none resize-none"
              placeholder="Ask about a product, sizing, or availability..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default BookingModal
