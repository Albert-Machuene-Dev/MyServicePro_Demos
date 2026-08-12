import { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function MenuSection({ onOrder }) {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="menu" className="py-20 md:py-32 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <UtensilsCrossed className="mx-auto text-accent mb-4" size={40} />
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Menu
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto">
            Every dish tells a story. Explore our carefully curated selection of flavors.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {restaurant.menuCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === index
                  ? 'bg-primary text-light'
                  : 'bg-light/5 text-secondary hover:bg-light/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-8">
          {restaurant.menuCategories[activeCategory]?.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-light/5 rounded-2xl overflow-hidden hover:bg-light/10 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/assets/images/placeholder-food.svg'
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-semibold text-light">
                    {item.name}
                  </h3>
                  <span className="text-accent font-bold text-lg">
                    {item.price}
                  </span>
                </div>
                <p className="text-secondary/70 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <button
                  onClick={onOrder}
                  className="text-primary hover:text-accent font-medium text-sm transition-colors flex items-center gap-2"
                >
                  Add to booking →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenuSection
