import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 bg-dark/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Visit Us
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto">
            We would love to welcome you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 p-4 rounded-xl bg-light/5">
              <MapPin className="text-accent shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-light mb-1">Address</h3>
                <p className="text-secondary/70">{restaurant.location}</p>
              </div>
            </div>

            <a href={`tel:${restaurant.phone}`} className="flex items-start gap-4 p-4 rounded-xl bg-light/5 hover:bg-light/10 transition-colors">
              <Phone className="text-accent shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-light mb-1">Phone</h3>
                <p className="text-secondary/70">{restaurant.phone}</p>
              </div>
            </a>

            <a href={`mailto:${restaurant.email}`} className="flex items-start gap-4 p-4 rounded-xl bg-light/5 hover:bg-light/10 transition-colors">
              <Mail className="text-accent shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-light mb-1">Email</h3>
                <p className="text-secondary/70">{restaurant.email}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-light/5">
              <Clock className="text-accent shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-light mb-2">Opening Hours</h3>
                <div className="space-y-1">
                  {restaurant.hours.map((hour) => (
                    <div key={hour.day} className="flex justify-between text-secondary/70 text-sm">
                      <span>{hour.day}</span>
                      <span>{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href={restaurant.social.instagram} className="p-3 rounded-full bg-light/5 hover:bg-primary transition-colors text-light">
                <Instagram size={20} />
              </a>
              <a href={restaurant.social.facebook} className="p-3 rounded-full bg-light/5 hover:bg-primary transition-colors text-light">
                <Facebook size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden bg-light/5 aspect-square md:aspect-auto min-h-[400px] flex items-center justify-center"
          >
            <div className="text-center p-8">
              <MapPin className="mx-auto text-accent mb-4" size={48} />
              <p className="text-secondary/70">Map integration available upon subscription</p>
              <p className="text-sm text-secondary/50 mt-2">Demo preview only</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
