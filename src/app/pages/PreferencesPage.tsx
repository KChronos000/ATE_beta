import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, Moon, Fish, Wheat, Milk, Egg, Nut, ShellIcon, Apple, Beef, Cherry, Carrot, Citrus, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const dietaryPreferences = [
  { id: 'vegan', name: 'Vegan', icon: Leaf, color: 'bg-green-500 dark:bg-green-600', description: 'No animal products' },
  { id: 'vegetarian', name: 'Vegetarian', icon: Leaf, color: 'bg-green-400 dark:bg-green-500', description: 'No meat or fish' },
  { id: 'halal', name: 'Halal', icon: Moon, color: 'bg-blue-500 dark:bg-blue-600', description: 'Islamic dietary laws' },
  { id: 'kosher', name: 'Kosher', icon: Moon, color: 'bg-indigo-500 dark:bg-indigo-600', description: 'Jewish dietary laws' },
  { id: 'pescatarian', name: 'Pescatarian', icon: Fish, color: 'bg-cyan-500 dark:bg-cyan-600', description: 'Fish but no meat' },
  { id: 'keto', name: 'Keto', icon: Beef, color: 'bg-purple-500 dark:bg-purple-600', description: 'Low-carb, high-fat' },
  { id: 'paleo', name: 'Paleo', icon: Apple, color: 'bg-amber-500 dark:bg-amber-600', description: 'Whole foods only' },
  { id: 'glutenfree', name: 'Gluten-Free', icon: Wheat, color: 'bg-yellow-600 dark:bg-yellow-700', description: 'No gluten' },
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
  { id: 1, label: '$', description: 'Budget-friendly ($5-15)', color: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800' },
  { id: 2, label: '$$', description: 'Moderate ($15-30)', color: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-800' },
  { id: 3, label: '$$$', description: 'Upscale ($30+)', color: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800' },
];

export function PreferencesPage() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = useApp();
  const { t } = useLanguage();
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
    <div className="size-full overflow-auto p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 transition-colors"
        >
          <DollarSign size={20} />
          <span className="text-sm">← {t('goBack')}</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-orange-600 dark:text-orange-500 mb-2 font-bold">{t('yourFoodPreferences')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t('helpFindPerfectMeal')}</p>
        </div>

        {/* Dietary Preferences Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border-2 border-pink-200 dark:border-pink-900/50 transition-colors">
          <h3 className="text-pink-600 dark:text-pink-400 font-semibold mb-2">{t('dietaryPreferences')}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('selectAllApply')}</p>
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
                      : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <Icon size={20} className="mb-1" />
                  <p className="text-sm font-medium">{pref.name}</p>
                  <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{pref.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Allergies Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border-2 border-red-200 dark:border-red-900/50 transition-colors">
          <h3 className="text-red-600 dark:text-red-400 font-semibold mb-2">{t('allergiesSensitivities')}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">⚠️ {t('excludeFromResults')}</p>
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
                      ? 'bg-red-500 dark:bg-red-600 text-white border-transparent shadow-lg'
                      : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{allergy.name}</p>
                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{allergy.description}</p>
                  </div>
                  {isSelected && (
                    <div className="bg-white/20 dark:bg-black/20 px-2 py-1 rounded text-xs">
                      {allergy.severity === 'high' ? '🔴' : allergy.severity === 'medium' ? '🟡' : '🟢'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200 dark:border-green-900/50 transition-colors">
          <h3 className="text-green-700 dark:text-green-400 font-semibold mb-2 flex items-center gap-2">
            <DollarSign size={20} />
            {t('priceRange')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('selectAllApply')}</p>

          <div className="space-y-3 mb-4">
            {priceRanges.map(range => {
              const isSelected = selectedPriceRanges.includes(range.id);
              return (
                <button
                  key={range.id}
                  onClick={() => togglePriceRange(range.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-green-500 dark:bg-green-600 text-white border-transparent shadow-lg'
                      : `${range.color} hover:shadow-md`
                  }`}
                >
                  <div>
                    <p className={`text-lg ${!isSelected ? 'font-bold' : ''}`}>{range.label}</p>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'opacity-70'}`}>{range.description}</p>
                  </div>
                  {isSelected && (
                    <div className="text-2xl">✓</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom Price Range */}
          <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-gray-700 dark:text-gray-300 mb-3 text-sm font-medium">{t('customPriceRange')}</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{t('minPrice')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    min="0"
                    max={priceMax}
                    className="w-full pl-7 pr-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:border-green-500 dark:focus:border-green-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{t('maxPrice')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    min={priceMin}
                    max="200"
                    className="w-full pl-7 pr-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:border-green-500 dark:focus:border-green-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {t('averagingPerPerson')} ${priceMin} - ${priceMax} {t('perPerson')}
            </p>
          </div>
        </div>

        {/* Favorite Cuisines Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border-2 border-yellow-200 dark:border-yellow-900/50 transition-colors">
          <h3 className="text-yellow-700 dark:text-yellow-400 font-semibold mb-2">{t('favoriteCuisines')}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('prioritizeRecommendations')}</p>
          <div className="grid grid-cols-2 gap-3">
            {cuisines.map(cuisine => {
              const isSelected = selectedCuisines.includes(cuisine);
              return (
                <button
                  key={cuisine}
                  onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                  className={`p-3 rounded-xl border-2 transition-all text-gray-800 dark:text-gray-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-500 dark:to-orange-500 text-white border-transparent shadow-lg'
                      : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700'
                  }`}
                >
                  <span className="text-sm font-medium">{cuisine}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 hover:opacity-90 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold mb-4"
        >
          {t('savePreferences')}
        </button>
      </div>
    </div>
  );
}