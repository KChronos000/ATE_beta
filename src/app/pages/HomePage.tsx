  import { useState, useMemo } from 'react';
  import { Link } from 'react-router';
  import { X, DollarSign } from 'lucide-react';
  import { restaurants } from '../data/restaurants';
  import { RestaurantCard } from '../components/RestaurantCard';
  import { useApp } from '../context/AppContext';
  import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

  const categories = [
    { id: 1, name: 'Main Course', emoji: '🍽️', color: 'bg-orange-400', foodType: 'main course', lat: 40.7595, lng: -73.9840 },
    { id: 2, name: 'Sides', emoji: '🥗', color: 'bg-yellow-400', foodType: 'sides', lat: 40.7589, lng: -73.9851 },
    { id: 3, name: 'Desserts', emoji: '🍰', color: 'bg-pink-400', foodType: 'desserts', lat: 40.7585, lng: -73.9845 },
    { id: 4, name: 'Drinks', emoji: '🥤', color: 'bg-red-400', foodType: 'drinks', lat: 40.7580, lng: -73.9855 },
    { id: 5, name: 'Appetizers', emoji: '🥟', color: 'bg-orange-300', foodType: 'appetizers', lat: 40.7621, lng: -73.9765 },
    { id: 6, name: 'Breakfast', emoji: '🥞', color: 'bg-yellow-500', foodType: 'breakfast', lat: 40.7614, lng: -73.9776 },
  ];

  const quickCategories = [
    { id: 'mains', name: 'Mains', icon: '🍽️', foodType: 'main course' },
    { id: 'sides', name: 'Sides', icon: '🥗', foodType: 'sides' },
    { id: 'desserts', name: 'Desserts', icon: '🍰', foodType: 'desserts' },
  ];

  export function HomePage() {
    const API_KEY = 'ใส่_API_KEY_ของคุณที่นี่'
    const { user, preferences } = useApp();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedQuickCategory, setSelectedQuickCategory] = useState<string | null>(null);
    const [selectedPriceFilter, setSelectedPriceFilter] = useState<number[]>(preferences.priceRange || [1, 2, 3]);
    const [showLogin, setShowLogin] = useState(true);

    const selectedCategoryData = useMemo(() => {
      return categories.find(cat => cat.id === selectedCategory);
    }, [selectedCategory]);

    const filteredRestaurants = useMemo(() => {
      let filtered = restaurants;

      const activeFoodType = selectedQuickCategory
        ? quickCategories.find(cat => cat.id === selectedQuickCategory)?.foodType
        : selectedCategory
          ? categories.find(cat => cat.id === selectedCategory)?.foodType
          : null;

      if (activeFoodType) {
        filtered = filtered.filter(restaurant => restaurant.foodTypes.includes(activeFoodType));
      }

      if (selectedPriceFilter.length > 0) {
        filtered = filtered.filter(restaurant => selectedPriceFilter.includes(restaurant.priceLevel));
      }

      return filtered
        .sort((a, b) => a.distance - b.distance)
        .slice(0, selectedCategory || selectedQuickCategory ? 10 : 3);
    }, [selectedCategory, selectedQuickCategory, selectedPriceFilter]);

    const [clickedPos, setClickedPos] = useState<{ lat: number, lng: number } | null>(null);

    const togglePriceFilter = (price: number) => {
      if (selectedPriceFilter.includes(price)) {
        const newFilters = selectedPriceFilter.filter(p => p !== price);
        setSelectedPriceFilter(newFilters.length > 0 ? newFilters : (preferences.priceRange || [1, 2, 3]));
      } else {
        setSelectedPriceFilter([...selectedPriceFilter, price]);
      }
    };

    const handleQuickCategoryClick = (categoryId: string) => {
      if (selectedQuickCategory === categoryId) {
        setSelectedQuickCategory(null);
      } else {
        setSelectedQuickCategory(categoryId);
        setSelectedCategory(null);
      }
    };
    

    return (
      <div className="size-full">
        {!user.isLoggedIn && showLogin && (
          <div className="bg-gradient-to-r from-pink-400 to-orange-400 p-4 text-white text-center flex-shrink-0">
            <p className="mb-2 text-sm">Sign in to get personalized recommendations!</p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/login"
                className="inline-block bg-white text-orange-600 px-4 py-2 rounded-full hover:bg-orange-50 transition-colors text-sm"
              >
                Sign In / Sign Up
              </Link>
              <button
                onClick={() => setShowLogin(false)}
                className="text-white underline hover:no-underline text-sm"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        <div className="p-4">
          {user.isLoggedIn && (
            <div className="mb-4 bg-white rounded-xl p-3 shadow-md border-2 border-orange-200">
              <p className="text-sm text-gray-700">Welcome back, <span className="text-orange-600">{user.name}</span>! 👋</p>
            </div>
          )}

          <h2 className="text-orange-600 mb-1">What are you craving?</h2>
          <p className="text-gray-600 mb-4 text-sm">Tap a category on the map or filter below</p>

          <div className="relative bg-white rounded-2xl shadow-xl mb-4 overflow-hidden" style={{ height: '300px' }}>
            <div className="relative bg-white rounded-2xl shadow-xl mb-4 overflow-hidden" style={{ height: '300px' }}>
            <APIProvider apiKey={API_KEY}>
              <Map
                defaultCenter={{ lat: 40.7588, lng: -73.9851 }} // แถว Times Square ตามข้อมูลพิกัดใน categories คุณ
                defaultZoom={15}
                mapId={'YOUR_MAP_ID'} // ใส่ ID จาก Google Console (หรือใส่ string อะไรไปก่อนก็ได้ถ้ายังไม่มี)
                disableDefaultUI={true} // ทำให้แผนที่ดูสะอาดเหมือนแอปมือถือ
                onClick={(e) => {
                if (e.detail.latLng) {
                  console.log("Clicked at:", e.detail.latLng);
                  setClickedPos(e.detail.latLng);
                  // คุณสามารถเพิ่ม Logic ตรงนี้ได้ เช่น:
                  // - เรียก API ค้นหาร้านอาหารรอบๆ พิกัดนี้
                  // - หรือสั่งให้ setSelectedCategory(null) เพื่อเคลียร์ฟิลเตอร์เดิม
                }
              }}
              >
                {/* วนลูปสร้างหมุดจาก categories ของคุณ */}
                {/* 1. แสดงหมุดหมวดหมู่เดิมของคุณ */}
                {categories.map((category) => (
                  <AdvancedMarker
                    key={category.id}
                    position={{ lat: category.lat, lng: category.lng }}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className={`...ดีไซน์เดิมของคุณ...`}>
                      <span>{category.emoji}</span>
                    </div>
                  </AdvancedMarker>
                ))}

                {/* 2. แสดงหมุดพิเศษเมื่อผู้ใช้คลิกบนแผนที่ */}
                {clickedPos && (
                  <AdvancedMarker position={clickedPos}>
                    <div className="bg-white p-2 rounded-full shadow-2xl border-2 border-red-500 animate-bounce">
                      📍
                    </div>
                  </AdvancedMarker>
                )}
              </Map>
            </APIProvider>
          </div>

            {categories.map((category, index) => {
              const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 110;
              const centerX = 50;
              const centerY = 50;
              const x = centerX + (radius * Math.cos(angle));
              const y = centerY + (radius * Math.sin(angle));

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`absolute ${category.color} hover:scale-110 transition-all duration-300 rounded-full shadow-lg p-3 flex flex-col items-center justify-center gap-1 ${
                    selectedCategory === category.id ? 'ring-4 ring-orange-500 scale-125 z-10' : ''
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '70px',
                    height: '70px'
                  }}
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-[10px] text-white text-center leading-tight">{category.name}</span>
                </button>
              );
            })}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center shadow-xl z-0">
              <span className="text-white text-xl">🍴</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-700 mb-3 text-sm">Quick Filter</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {quickCategories.map(category => {
                const isSelected = selectedQuickCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleQuickCategoryClick(category.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white border-transparent shadow-lg'
                        : 'bg-white border-orange-200 hover:border-orange-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <p className="text-xs">{category.name}</p>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-xl p-3 shadow-md border-2 border-green-200">
              <h4 className="text-gray-700 mb-2 text-sm flex items-center gap-1">
                <DollarSign size={16} className="text-green-600" />
                Price Range
              </h4>
              <div className="flex gap-2">
                {[1, 2, 3].map(price => {
                  const isSelected = selectedPriceFilter.includes(price);
                  return (
                    <button
                      key={price}
                      onClick={() => togglePriceFilter(price)}
                      className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'bg-green-500 text-white border-green-500 shadow-md'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {'$'.repeat(price)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {(selectedCategory || selectedQuickCategory) && (
            <div className="mb-4 bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl p-3 flex items-center justify-between border-2 border-orange-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {selectedQuickCategory
                    ? quickCategories.find(c => c.id === selectedQuickCategory)?.icon
                    : selectedCategoryData?.emoji}
                </span>
                <div>
                  <p className="text-sm text-gray-700">Showing</p>
                  <p className="text-orange-700">
                    {selectedQuickCategory
                      ? quickCategories.find(c => c.id === selectedQuickCategory)?.name
                      : selectedCategoryData?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedQuickCategory(null);
                }}
                className="bg-white text-orange-600 p-2 rounded-full hover:bg-orange-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}

          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-orange-600">
              {selectedCategory || selectedQuickCategory ? 'Matching Restaurants' : 'Nearby Restaurants'}
            </h3>
            <span className="text-sm text-gray-500">{filteredRestaurants.length} found</span>
          </div>

          <div className="space-y-3 pb-4">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>
    );
  }
