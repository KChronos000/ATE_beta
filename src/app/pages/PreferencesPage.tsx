import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, Moon, Fish, Wheat, Milk, Egg, Nut, ShellIcon, Apple, Beef, Cherry, Carrot, Citrus, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

const dietaryPreferences = [
  { id: 'vegan', name: 'Vegan', icon: Leaf, color: 'bg-green-500', description: 'No animal products' },
  { id: 'vegetarian', name: 'Vegetarian', icon: Leaf, color: 'bg-green-400', description: 'No meat or fish' },
  { id: 'halal', name: 'Halal', icon: Moon, color: 'bg-blue-500', description: 'Islamic dietary laws' },
  { id: 'kosher', name: 'Kosher', icon: Moon, color: 'bg-indigo-500', description: 'Jewish dietary laws' },
  { id: 'pescatarian', name: 'Pescatarian', icon: Fish, color: 'bg-cyan-500', description: 'Fish but no meat' },
  { id: 'keto', name: 'Keto', icon: Beef, color: 'bg-purple-500', description: 'Low-carb, high-fat' },
  { id: 'paleo', name: 'Paleo', icon: Apple, color: 'bg-amber-500', description: 'Whole foods only' },
  { id: 'glutenfree', name: 'Gluten-Free', icon: Wheat, color: 'bg-yellow-600', description: 'No gluten' },
];

const allergies = [
  { id: 'gluten', name: 'Gluten/Wheat', icon: Wheat, severity: 'high', description: 'Contains gluten proteins' },
  { id: 'dairy', name: 'Dairy/Lactose', icon: Milk, severity: 'high', description: 'Milk and dairy products' },
  { id: 'eggs', name: 'Eggs', icon: Egg, severity: 'high', description: 'Egg proteins' },
  { id: 'treenuts', name: 'Tree Nuts', icon: Nut, severity: 'high', description: 'Almonds, walnuts, cashews' },
  { id: 'peanuts', name: 'Peanuts', icon: Nut, severity: 'high', description: 'Legume allergy' },
  { id: 'shellfish', name: 'Shellfish', icon: ShellIcon, severity: 'high', description: 'Shrimp, crab, lobster' },
  { id: 'fish', name: 'Fish', icon: Fish, severity: 'high', description: 'All types of fish' },
  { id: 'soy', name: 'Soy', icon: Carrot, severity: 'medium', description: 'Soybean products' },
  { id: 'sesame', name: 'Sesame', icon: Cherry, severity: 'medium', description: 'Sesame seeds and oil' },
  { id: 'sulfites', name: 'Sulfites', icon: Cherry, severity: 'medium', description: 'Preservatives in wine, dried fruits' },
  { id: 'citrus', name: 'Citrus', icon: Citrus, severity: 'low', description: 'Oranges, lemons, limes' },
];

const cuisines = [
  '🍕 Italian', '🍜 Japanese', '🌮 Mexican', '🍛 Indian',
  '🍔 American', '🥖 French', '🥘 Mediterranean', '🍲 Chinese',
  '🥙 Middle Eastern', '🍱 Korean', '🍝 Thai', '🥗 Healthy',
  '🍗 Southern', '🌯 Tex-Mex', '🥩 Steakhouse', '🍕 Pizza'
];

const priceRanges = [
  { id: 1, label: '$', description: 'Budget-friendly ($5-15)', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 2, label: '$$', description: 'Moderate ($15-30)', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { id: 3, label: '$$$', description: 'Upscale ($30+)', color: 'bg-orange-100 text-orange-700 border-orange-300' },
];

export function PreferencesPage() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = useApp();
  const [selectedDietary, setSelectedDietary] = useState<string[]>(preferences.dietary || []);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(preferences.allergies || []);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(preferences.cuisines || []);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>(preferences.priceRange || [1, 2, 3]);
  const [priceMin, setPriceMin] = useState<number>(preferences.priceMin || 5);
  const [priceMax, setPriceMax] = useState<number>(preferences.priceMax || 50);

  useEffect(() => {
    setSelectedDietary(preferences.dietary || []);
    setSelectedAllergies(preferences.allergies || []);
    setSelectedCuisines(preferences.cuisines || []);
    setSelectedPriceRanges(preferences.priceRange || [1, 2, 3]);
    setPriceMin(preferences.priceMin || 5);
    setPriceMax(preferences.priceMax || 50);
  }, [preferences]);

  const toggleSelection = (id: string, list: string[], setter: (value: string[]) => void) => {
    if (list.includes(id)) {
      setter(list.filter(item => item !== id));
    } else {
      setter([...list, id]);
    }
  };

  const togglePriceRange = (id: number) => {
    if (selectedPriceRanges.includes(id)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(item => item !== id));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, id]);
    }
  };

  const handleSave = () => {
    setPreferences({
      dietary: selectedDietary,
      allergies: selectedAllergies,
      cuisines: selectedCuisines,
      priceRange: selectedPriceRanges.length > 0 ? selectedPriceRanges : [1, 2, 3],
      priceMin: priceMin,
      priceMax: priceMax
    });
    navigate('/');
  };

  return (
    <div className="size-full overflow-auto p-4">
      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-orange-600 mb-2">Your Food Preferences</h2>
          <p className="text-gray-600">Help us find the perfect meal for you</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-pink-200">
          <h3 className="text-pink-600 mb-2">Dietary Preferences</h3>
          <p className="text-xs text-gray-500 mb-4">Select all that apply to your diet</p>
          <div className="grid grid-cols-2 gap-3">
            {dietaryPreferences.map(pref => {
              const Icon = pref.icon;
              const isSelected = selectedDietary.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  onClick={() => toggleSelection(pref.id, selectedDietary, setSelectedDietary)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? `${pref.color} text-white border-transparent shadow-lg`
                      : 'bg-gray-50 border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <Icon size={20} className="mb-1" />
                  <p className="text-sm">{pref.name}</p>
                  <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>{pref.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-red-200">
          <h3 className="text-red-600 mb-2">Allergies & Food Sensitivities</h3>
          <p className="text-xs text-gray-500 mb-4">⚠️ We'll exclude these from your results</p>
          <div className="space-y-2">
            {allergies.map(allergy => {
              const Icon = allergy.icon;
              const isSelected = selectedAllergies.includes(allergy.id);
              return (
                <button
                  key={allergy.id}
                  onClick={() => toggleSelection(allergy.id, selectedAllergies, setSelectedAllergies)}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                    isSelected
                      ? 'bg-red-500 text-white border-transparent shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:border-red-300'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{allergy.name}</p>
                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>{allergy.description}</p>
                  </div>
                  {isSelected && (
                    <div className="bg-white/20 px-2 py-1 rounded text-xs">
                      {allergy.severity === 'high' ? '🔴' : allergy.severity === 'medium' ? '🟡' : '🟢'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
          <h3 className="text-green-700 mb-2 flex items-center gap-2">
            <DollarSign size={20} />
            Price Range
          </h3>
          <p className="text-xs text-gray-500 mb-4">Select your budget preferences</p>

          <div className="space-y-3 mb-4">
            {priceRanges.map(range => {
              const isSelected = selectedPriceRanges.includes(range.id);
              return (
                <button
                  key={range.id}
                  onClick={() => togglePriceRange(range.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-green-500 text-white border-transparent shadow-lg'
                      : `${range.color} border-2 hover:shadow-md`
                  }`}
                >
                  <div>
                    <p className={`text-lg ${!isSelected && 'font-bold'}`}>{range.label}</p>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'opacity-70'}`}>{range.description}</p>
                  </div>
                  {isSelected && (
                    <div className="text-2xl">✓</div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t-2 border-gray-200 pt-4">
            <h4 className="text-gray-700 mb-3 text-sm">Custom Price Range</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    min="0"
                    max={priceMax}
                    className="w-full pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    min={priceMin}
                    max="200"
                    className="w-full pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Restaurants averaging ${priceMin} - ${priceMax} per person
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-yellow-200">
          <h3 className="text-yellow-700 mb-2">Favorite Cuisines</h3>
          <p className="text-xs text-gray-500 mb-4">We'll prioritize these in your recommendations</p>
          <div className="grid grid-cols-2 gap-3">
            {cuisines.map(cuisine => {
              const isSelected = selectedCuisines.includes(cuisine);
              return (
                <button
                  key={cuisine}
                  onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-transparent shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <span className="text-sm">{cuisine}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-4"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
