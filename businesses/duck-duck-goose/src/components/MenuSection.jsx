import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function MenuSection({ onOrder }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)

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
          <ShoppingBag className="mx-auto text-white mb-4" size={40} />
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Products
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto">
            Every piece tells a story. Explore our carefully curated collection of SA design.
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
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-secondary hover:bg-white/10'
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
              <div
                className="aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage({ src: item.image, alt: item.name })}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'assets/images/placeholder-food.svg'
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-semibold text-light">
                    {item.name}
                  </h3>
                  <span className="text-white font-bold text-lg">
                    {item.price}
                  </span>
                </div>
                <p className="text-secondary/70 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <button
                  onClick={onOrder}
                  className="text-white hover:text-white/70 font-medium text-sm transition-colors flex items-center gap-2"
                >
                  Shop Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MenuSection
