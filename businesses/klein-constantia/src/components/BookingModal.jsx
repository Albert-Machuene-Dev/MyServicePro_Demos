import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, Users, Mail, Wine } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function BookingModal({ onClose, onDemoNotice }) {
  const tastings = restaurant.menuCategories[0]?.items || []
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tasting: tastings[0]?.name || '',
    date: '',
    guests: '2',
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
        className="relative w-full max-w-md glass rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary/60 hover:text-light transition-colors"
        >
          <X size={24} />
        </button>

        <Wine className="text-white mb-3" size={28} />
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Book Tasting
        </h2>
        <p className="text-secondary/60 text-sm mb-6">
          This is a demo preview. Buttons are for visual demonstration only.
        </p>

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
            <label className="block text-sm font-medium text-secondary mb-1">
              <Mail size={14} className="inline mr-1" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none"
              placeholder="+27 82 000 0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              <Wine size={14} className="inline mr-1" />
              Tasting Selection
            </label>
            <select
              value={formData.tasting}
              onChange={(e) => setFormData({ ...formData, tasting: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light focus:border-white focus:outline-none"
            >
              {tastings.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} — {item.price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                <Calendar size={14} className="inline mr-1" />
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                <Users size={14} className="inline mr-1" />
                Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light focus:border-white focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none resize-none"
              placeholder="Special requests or questions..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Book Tasting
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default BookingModal
