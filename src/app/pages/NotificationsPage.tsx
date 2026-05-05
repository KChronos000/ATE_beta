import { Tag, Clock, MapPin, Percent } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'deal',
    title: '50% Off Pizza Night!',
    restaurant: "Mario's Pizzeria",
    description: 'Get half off any large pizza from 5-8 PM',
    validUntil: 'Today at 8:00 PM',
    discount: '50%',
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Free Dessert with Entree',
    restaurant: 'Sweet Treats Cafe',
    description: 'Order any main course and get a free dessert',
    validUntil: 'Expires in 2 days',
    discount: 'Free',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 3,
    type: 'sale',
    title: 'Happy Hour Special',
    restaurant: 'The Green Bowl',
    description: 'All smoothies and bowls $5 during happy hour',
    validUntil: 'Daily 2-5 PM',
    discount: '$5',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    type: 'deal',
    title: 'Buy 1 Get 1 Free',
    restaurant: 'Spice Garden',
    description: 'BOGO on all curry dishes this weekend',
    validUntil: 'This Weekend',
    discount: 'BOGO',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 5,
    type: 'promotion',
    title: '20% Off First Order',
    restaurant: 'Sunny Cafe',
    description: 'New customer special - 20% off your first order',
    validUntil: 'One time use',
    discount: '20%',
    color: 'from-yellow-500 to-orange-500'
  },
];

export function NotificationsPage() {
  return (
    <div className="size-full overflow-auto p-4">
      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-orange-600 mb-2">Deals & Promotions</h2>
          <p className="text-gray-600">Save big on your favorite foods!</p>
        </div>

        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-100 hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${notification.color} p-4 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag size={20} />
                      <h3 className="text-white">{notification.title}</h3>
                    </div>
                    <p className="text-sm opacity-90">{notification.restaurant}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-white">{notification.discount}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-700 mb-3">{notification.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock size={16} />
                    <span>{notification.validUntil}</span>
                  </div>

                  <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-md transition-shadow">
                    Use Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <Percent size={24} />
            </div>
            <div>
              <h3 className="text-orange-700">Want more deals?</h3>
              <p className="text-sm text-gray-600">Set your preferences to get personalized offers</p>
            </div>
          </div>
          <button className="w-full bg-white text-orange-600 py-3 rounded-xl hover:bg-orange-50 transition-colors border-2 border-orange-300">
            Update Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
