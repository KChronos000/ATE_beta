import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';

const foodOptions = [
  { id: 1, name: 'Pizza', emoji: '🍕', color: 'bg-red-400', foodType: 'pizza' },
  { id: 2, name: 'Sushi', emoji: '🍣', color: 'bg-orange-400', foodType: 'sushi' },
  { id: 3, name: 'Burger', emoji: '🍔', color: 'bg-yellow-400', foodType: 'burger' },
  { id: 4, name: 'Pasta', emoji: '🍝', color: 'bg-pink-400', foodType: 'pasta' },
  { id: 5, name: 'Tacos', emoji: '🌮', color: 'bg-orange-500', foodType: 'tacos' },
  { id: 6, name: 'Curry', emoji: '🍛', color: 'bg-yellow-500', foodType: 'curry' },
  { id: 7, name: 'Salad', emoji: '🥗', color: 'bg-green-400', foodType: 'salad' },
  { id: 8, name: 'Ramen', emoji: '🍜', color: 'bg-red-500', foodType: 'ramen' },
];

export function SpinWheelPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedFood, setSelectedFood] = useState<typeof foodOptions[0] | null>(null);
  const [rotation, setRotation] = useState(0);

  const nearbyRestaurants = useMemo(() => {
    if (!selectedFood) return [];

    return restaurants
      .filter(restaurant => restaurant.foodTypes.includes(selectedFood.foodType))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [selectedFood]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedFood(null);

    const randomIndex = Math.floor(Math.random() * foodOptions.length);
    const selectedItem = foodOptions[randomIndex];

    const spins = 5;
    const segmentAngle = 360 / foodOptions.length;
    const targetAngle = (randomIndex * segmentAngle);
    const finalRotation = (spins * 360) + targetAngle;

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
        <div className="text-center mb-6">
          <h2 className="text-orange-600 mb-1">What Should You Eat?</h2>
          <p className="text-gray-600 text-sm">Spin the wheel and let fate decide!</p>
        </div>

        <div className="relative flex items-center justify-center mb-6">
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
                ${foodOptions.map((_, i) => {
                  const startAngle = (i * 360) / foodOptions.length;
                  const endAngle = ((i + 1) * 360) / foodOptions.length;
                  const colors = ['#ef4444', '#f97316', '#eab308', '#ec4899', '#f97316', '#eab308', '#22c55e', '#ef4444'];
                  return `${colors[i]} ${startAngle}deg ${endAngle}deg`;
                }).join(', ')}
              )`
            }}
          >
            {foodOptions.map((food, index) => {
              const angle = (index * 360) / foodOptions.length + (360 / foodOptions.length / 2);
              const radian = (angle * Math.PI) / 180;
              const radius = 100;
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              return (
                <div
                  key={food.id}
                  className="absolute top-1/2 left-1/2 flex items-center justify-center"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                  }}
                >
                  <span className="text-4xl drop-shadow-lg">{food.emoji}</span>
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
              💡 <strong>Pro Tip:</strong> Set your preferences to only spin foods you'll love!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
