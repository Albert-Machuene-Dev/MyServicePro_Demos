import { motion } from 'framer-motion'
import { Award, Clock, Users } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function AboutSection() {
  const features = [
    { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence' },
    { icon: Clock, title: 'Fresh Daily', desc: 'Prepared with passion' },
    { icon: Users, title: 'Perfect for Groups', desc: 'Memorable gatherings' },
  ]

  return (
    <section id="about" className="py-20 md:py-32 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <img
                src={restaurant.aboutImage || restaurant.gallery[0]}
                alt="Restaurant interior"
                className="rounded-2xl shadow-2xl shadow-primary/20 w-full aspect-[4/5] object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-2xl hidden md:block">
                <p className="font-display text-3xl font-bold text-light">15+</p>
                <p className="text-light/80 text-sm">Years of Excellence</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our Story
            </h2>
            <p className="text-secondary/80 text-lg leading-relaxed mb-8">
              {restaurant.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-light/5"
                >
                  <feature.icon className="mx-auto text-accent mb-3" size={28} />
                  <h3 className="font-semibold text-light mb-1">{feature.title}</h3>
                  <p className="text-secondary/60 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
