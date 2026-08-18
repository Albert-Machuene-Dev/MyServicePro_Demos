import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, Users, Clock, MapPin, Navigation, Car } from 'lucide-react'

function BookingModal({ onClose, onDemoNotice }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    passengers: '2',
    vehicle: 'Sedan (1-3 passengers)',
  })

  const vehicles = [
    'Sedan (1-3 passengers)',
    '9-Seater (up to 9 passengers)',
    '13-Seater (up to 13 passengers)',
    'VIP Chauffeur — Lexus/BMW',
    '19-Seater Luxury Coach',
  ]

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

        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Book Transfer
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
              <MapPin size={14} className="inline mr-1" />
              Pickup Location
            </label>
            <input
              type="text"
              value={formData.pickup}
              onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none"
              placeholder="e.g. Cape Town International Airport"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              <Navigation size={14} className="inline mr-1" />
              Drop-off Location
            </label>
            <input
              type="text"
              value={formData.dropoff}
              onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light placeholder-secondary/40 focus:border-white focus:outline-none"
              placeholder="e.g. V&A Waterfront"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                <Calendar size={14} className="inline mr-1" />
                Date
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
                <Clock size={14} className="inline mr-1" />
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              <Users size={14} className="inline mr-1" />
              Passengers
            </label>
            <select
              value={formData.passengers}
              onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light focus:border-white focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              <Car size={14} className="inline mr-1" />
              Vehicle
            </label>
            <select
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-light/10 text-light focus:border-white focus:outline-none"
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle} value={vehicle}>{vehicle}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Request Booking
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default BookingModal
