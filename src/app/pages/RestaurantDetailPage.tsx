import { useParams, useNavigate } from 'react-router';
import { MapPin, Phone, Clock, Star, ArrowLeft, Navigation } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';

export function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === Number(id));

  if (!restaurant) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Restaurant not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-orange-600 hover:text-orange-700"
        >
          Go back to home
        </button>
      </div>
    );
  }

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.lat},${restaurant.lng}`;
    window.open(url, '_blank');
  };

  const groupedMenu = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof restaurant.menu>);

  return (
    <div className="size-full overflow-auto">
      <div className="relative h-48 bg-gradient-to-br from-orange-400 to-pink-400">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-white mb-2">{restaurant.name}</h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="text-lg">{restaurant.rating}</span>
            </div>
            <p className="text-white/90">{restaurant.cuisine}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 border-2 border-orange-100">
          <h3 className="text-orange-600 mb-3">Location & Contact</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{restaurant.address}</p>
                <p className="text-xs text-gray-500">{restaurant.distance} mi away</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-gray-600" />
              <a href={`tel:${restaurant.phone}`} className="text-sm text-blue-600 hover:text-blue-700">
                {restaurant.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={18} className="text-gray-600" />
              <p className="text-sm text-gray-800">{restaurant.hours}</p>
            </div>
          </div>

          <button
            onClick={openInGoogleMaps}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            <Navigation size={20} />
            Open in Google Maps
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-4 border-2 border-orange-100">
          <h3 className="text-orange-600 mb-4">Menu</h3>

          {Object.entries(groupedMenu).map(([category, items]) => (
            <div key={category} className="mb-6 last:mb-0">
              <h4 className="text-gray-800 mb-3 pb-2 border-b border-gray-200">{category}</h4>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="text-orange-600 flex-shrink-0">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {restaurant.deals && (
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl p-4 mb-4">
            <h4 className="text-white mb-2">🎉 Special Deal Available!</h4>
            <p className="text-sm text-white/90">Check the Deals tab for current promotions</p>
          </div>
        )}
      </div>
    </div>
  );
}
