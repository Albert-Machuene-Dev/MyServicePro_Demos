import { Heart } from 'lucide-react'
import restaurant from '../data/restaurant.json'

function Footer() {
  return (
    <footer className="py-12 px-4 bg-dark border-t border-light/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-light mb-2">
              {restaurant.name}
            </h3>
            <p className="text-secondary/60 text-sm">
              {restaurant.location}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-secondary/60 text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-white" /> by MyServicePro
            </p>
            <p className="text-secondary/40 text-xs">
              Demo website — not the official site
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-light/5 text-center">
          <p className="text-secondary/40 text-xs">
            © {new Date().getFullYear()} {restaurant.name}. Demo created by MyServicePro.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
