import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { restaurants as allRestaurants } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { useLocation, calculateDistance } from '../context/LocationContext';
import { useApp } from '../context/AppContext';

const foodCategories = ['All Foods', 'Savory', 'Sweet', 'Breakfast'];

const allFoodOptions = [
  // Savory Meals
  { id: 1, name: 'Pizza', emoji: '🍕', color: '#ef4444', foodType: 'pizza', category: 'Savory', isSavory: true },
  { id: 2, name: 'Sushi', emoji: '🍣', color: '#f97316', foodType: 'sushi', category: 'Savory', isSavory: true },
  { id: 3, name: 'Burger', emoji: '🍔', color: '#eab308', foodType: 'burger', category: 'Savory', isSavory: true },
  { id: 4, name: 'Pasta', emoji: '🍝', color: '#ec4899', foodType: 'pasta', category: 'Savory', isSavory: true },
  { id: 5, name: 'Tacos', emoji: '🌮', color: '#f59e0b', foodType: 'tacos', category: 'Savory', isSavory: true },
  { id: 6, name: 'Curry', emoji: '🍛', color: '#facc15', foodType: 'curry', category: 'Savory', isSavory: true },
  { id: 7, name: 'Salad', emoji: '🥗', color: '#22c55e', foodType: 'salad', category: 'Savory', isSavory: true },
  { id: 8, name: 'Ramen', emoji: '🍜', color: '#dc2626', foodType: 'ramen', category: 'Savory', isSavory: true },
  { id: 9, name: 'Steak', emoji: '🥩', color: '#b91c1c', foodType: 'main course', category: 'Savory', isSavory: true },
  { id: 10, name: 'Sandwich', emoji: '🥪', color: '#fbbf24', foodType: 'main course', category: 'Savory', isSavory: true },
  { id: 11, name: 'BBQ', emoji: '🍖', color: '#ea580c', foodType: 'main course', category: 'Savory', isSavory: true },
  { id: 12, name: 'Fried Rice', emoji: '🍚', color: '#f59e0b', foodType: 'main course', category: 'Savory', isSavory: true },

  // Sweet Desserts
  { id: 13, name: 'Cake', emoji: '🍰', color: '#f9a8d4', foodType: 'desserts', category: 'Sweet', isSavory: false },
  { id: 14, name: 'Ice Cream', emoji: '🍦', color: '#93c5fd', foodType: 'desserts', category: 'Sweet', isSavory: false },
  { id: 15, name: 'Donuts', emoji: '🍩', color: '#fbcfe8', foodType: 'desserts', category: 'Sweet', isSavory: false },
  { id: 16, name: 'Cookies', emoji: '🍪', color: '#fbbf24', foodType: 'desserts', category: 'Sweet', isSavory: false },
  { id: 17, name: 'Pie', emoji: '🥧', color: '#fb923c', foodType: 'desserts', category: 'Sweet', isSavory: false },
  { id: 18, name: 'Cupcake', emoji: '🧁', color: '#f472b6', foodType: 'desserts', category: 'Sweet', isSavory: false },
  { id: 19, name: 'Brownie', emoji: '🍫', color: '#92400e', foodType: 'desserts', category: 'Sweet', isSavory: false },
  { id: 20, name: 'Candy', emoji: '🍬', color: '#c084fc', foodType: 'desserts', category: 'Sweet', isSavory: false },

  // Breakfast
  { id: 21, name: 'Pancakes', emoji: '🥞', color: '#fde047', foodType: 'breakfast', category: 'Breakfast', isSavory: false },
  { id: 22, name: 'Waffles', emoji: '🧇', color: '#fcd34d', foodType: 'breakfast', category: 'Breakfast', isSavory: false },
  { id: 23, name: 'Eggs', emoji: '🍳', color: '#fef08a', foodType: 'breakfast', category: 'Breakfast', isSavory: true },
  { id: 24, name: 'Bacon', emoji: '🥓', color: '#dc2626', foodType: 'breakfast', category: 'Breakfast', isSavory: true },
];

export function SpinWheelPage() {
  const { userLocation } = useLocation();
  const { settings } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedFood, setSelectedFood] = useState<typeof allFoodOptions[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Foods');

  // Calculate distances based on user location
  const restaurants = useMemo(() => {
    if (!userLocation) return allRestaurants;

    return allRestaurants.map(restaurant => ({
      ...restaurant,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.lat,
        restaurant.lng,
        settings.distance
      )
    }));
  }, [userLocation, settings.distance]);

  const foodOptions = useMemo(() => {
    if (selectedCategory === 'All Foods') return allFoodOptions;
    if (selectedCategory === 'Sweet') return allFoodOptions.filter(f => !f.isSavory);
    if (selectedCategory === 'Savory') return allFoodOptions.filter(f => f.isSavory);
    return allFoodOptions.filter(f => f.category === selectedCategory);
  }, [selectedCategory]);

  const nearbyRestaurants = useMemo(() => {
    if (!selectedFood) return [];

    return restaurants
      .filter(restaurant => restaurant.foodTypes.includes(selectedFood.foodType))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [selectedFood]);

  const spinWheel = () => {
    if (isSpinning || foodOptions.length === 0) return;

    setIsSpinning(true);
    setSelectedFood(null);

    const randomIndex = Math.floor(Math.random() * foodOptions.length);
    const selectedItem = foodOptions[randomIndex];

    const spins = 5;
    const segmentAngle = 360 / foodOptions.length;

    // Calculate the angle to center the selected segment at the top
    // We want the CENTER of the segment to align with the pointer at the top
    const segmentCenter = randomIndex * segmentAngle + (segmentAngle / 2);

    // Total rotation: full spins + rotation to align segment center with top
    // Subtract segmentCenter because we're rotating the wheel, not the pointer
    const finalRotation = (spins * 360) + (360 - segmentCenter);

    setRotation(finalRotation);

    setTimeout(() => {
      setSelectedFood(selectedItem);
      setIsSpinning(false);
    }, 3000);
  };

  const resetWheel = () => {
    setRotation(0);
    setSelectedFood(null);
  };

  return (
    <div className="size-full overflow-auto p-4">
      <div className="w-full">
        <div className="text-center mb-4">
          <h2 className="text-orange-600 mb-1">What Should You Eat?</h2>
          <p className="text-gray-600 text-sm">Choose a category and spin!</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-3 mb-4 border-2 border-orange-200">
          <h3 className="text-sm text-gray-700 mb-2">Category</h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {foodCategories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  resetWheel();
                }}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">{foodOptions.length} options available</p>
        </div>

        <div className="relative flex items-center justify-center mb-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-10">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-red-500 drop-shadow-lg"></div>
          </div>

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="relative w-72 h-72 rounded-full shadow-2xl border-8 border-white"
            style={{
              background: `conic-gradient(
                from 0deg,
                ${foodOptions.map((food, i) => {
                  const startAngle = (i * 360) / foodOptions.length;
                  const endAngle = ((i + 1) * 360) / foodOptions.length;
                  return `${food.color} ${startAngle}deg ${endAngle}deg`;
                }).join(', ')}
              )`
            }}
          >
            {foodOptions.map((food, index) => {
              const segmentAngle = 360 / foodOptions.length;
              const angle = index * segmentAngle + (segmentAngle / 2);
              const radian = (angle * Math.PI) / 180;
              const radius = 95;
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              return (
                <div
                  key={food.id}
                  className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                  }}
                >
                  <span className="text-2xl drop-shadow-lg">{food.emoji}</span>
                </div>
              );
            })}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-orange-500">
              <Sparkles className="text-orange-500" size={28} />
            </div>
          </motion.div>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`flex-1 bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 text-white py-3 rounded-xl shadow-lg transition-all ${
              isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
          </button>

          <button
            onClick={resetWheel}
            className="bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <AnimatePresence>
          {selectedFood && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 text-center border-4 border-orange-300">
                <div className="text-5xl mb-3">{selectedFood.emoji}</div>
                <h3 className="text-orange-600 mb-1">You should eat...</h3>
                <h2 className="text-gray-800 mb-3">{selectedFood.name}!</h2>
              </div>

              {nearbyRestaurants.length > 0 && (
                <div>
                  <h3 className="text-orange-600 mb-3">Nearby {selectedFood.name} Spots</h3>
                  <div className="space-y-3">
                    {nearbyRestaurants.map(restaurant => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                </div>
              )}

              {nearbyRestaurants.length === 0 && (
                <div className="bg-yellow-50 rounded-xl p-4 text-center border-2 border-yellow-200">
                  <p className="text-sm text-gray-700">
                    No {selectedFood.name} restaurants found nearby. Try spinning again!
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedFood && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 text-center border-2 border-orange-200">
            <p className="text-sm text-gray-700">
              💡 <strong>Pro Tip:</strong> Choose a category to filter your options!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
