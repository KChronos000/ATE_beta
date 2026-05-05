import { Star, MapPin, Leaf, Moon, DollarSign } from 'lucide-react';
import { Restaurant } from '../data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow border-2 border-orange-100">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-gray-800">{restaurant.name}</h4>
          <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
        </div>
        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
          <Star size={16} className="text-yellow-600 fill-yellow-600" />
          <span className="text-sm text-yellow-800">{restaurant.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{restaurant.distance} mi</span>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: restaurant.priceLevel }).map((_, i) => (
            <DollarSign key={i} size={12} className="text-green-600" />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {restaurant.isVegan && (
          <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded">
            <Leaf size={12} className="text-green-700" />
            <span className="text-xs text-green-700">Vegan</span>
          </div>
        )}
        {restaurant.isHalal && (
          <div className="flex items-center gap-1 bg-blue-100 px-2 py-0.5 rounded">
            <Moon size={12} className="text-blue-700" />
            <span className="text-xs text-blue-700">Halal</span>
          </div>
        )}
        {restaurant.isKosher && (
          <div className="flex items-center gap-1 bg-indigo-100 px-2 py-0.5 rounded">
            <Moon size={12} className="text-indigo-700" />
            <span className="text-xs text-indigo-700">Kosher</span>
          </div>
        )}
        {restaurant.deals && (
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-2 py-0.5 rounded text-xs">
            🎉 Deal!
          </div>
        )}
      </div>
    </div>
  );
}
