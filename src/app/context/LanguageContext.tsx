import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'th';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // App name
    appName: 'ATE!',

    // Navigation
    home: 'Home',
    spin: 'Spin',
    deals: 'Deals',
    settings: 'Settings',

    // Home page
    welcomeBack: 'Welcome back',
    whatCraving: 'What are you craving?',
    tapCategory: 'Tap a category on the map or filter below',
    quickFilter: 'Quick Filter',
    priceRange: 'Price Range',
    showing: 'Showing',
    matchingRestaurants: 'Matching Restaurants',
    nearbyRestaurants: 'Nearby Restaurants',
    found: 'found',
    signInPrompt: 'Sign in to get personalized recommendations!',
    signInSignUp: 'Sign In / Sign Up',
    skip: 'Skip',

    // Categories
    mains: 'Mains',
    sides: 'Sides',
    desserts: 'Desserts',

    // Spin wheel
    whatShouldEat: 'What Should You Eat?',
    chooseCategory: 'Choose a category and spin!',
    category: 'Category',
    optionsAvailable: 'options available',
    spinning: 'Spinning...',
    spinWheel: 'Spin the Wheel!',
    youShouldEat: 'You should eat...',
    nearbySpots: 'Nearby',
    proTip: 'Pro Tip:',
    chooseCategoryFilter: 'Choose a category to filter your options!',

    // Food categories
    allFoods: 'All Foods',
    savory: 'Savory',
    sweet: 'Sweet',
    breakfast: 'Breakfast',

    // Settings
    customizeExperience: 'Customize your ATE! experience',
    profile: 'Profile',
    manageAccount: 'Manage your account',
    foodPreferences: 'Food Preferences',
    dietaryAllergies: 'Dietary & allergies',
    appSettings: 'App Settings',
    pushNotifications: 'Push Notifications',
    getDealsUpdates: 'Get deals and updates',
    locationServices: 'Location Services',
    findNearbyRestaurants: 'Find nearby restaurants',
    gettingLocation: 'Getting location...',
    enableLocationAccess: 'Enable Location Access',
    darkMode: 'Dark Mode',
    toggleDarkTheme: 'Toggle dark theme',
    distanceUnit: 'Distance Unit',
    language: 'Language',
    selectLanguage: 'Select your preferred language',
    about: 'About ATE!',
    version: 'Version',

    // Profile
    manageAccountInfo: 'Manage your account information',
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    location: 'Location',
    saveChanges: 'Save Changes',
    accountStats: 'Account Stats',
    favorites: 'Favorites',
    reviews: 'Reviews',
    dealsUsed: 'Deals Used',
    signOut: 'Sign Out',

    // Preferences
    yourFoodPreferences: 'Your Food Preferences',
    helpFindPerfectMeal: 'Help us find the perfect meal for you',
    dietaryPreferences: 'Dietary Preferences',
    selectAllApply: 'Select all that apply to your diet',
    allergiesSensitivities: 'Allergies & Food Sensitivities',
    excludeFromResults: "We'll exclude these from your results",
    customPriceRange: 'Custom Price Range',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    averagingPerPerson: 'Restaurants averaging',
    perPerson: 'per person',
    favoriteCuisines: 'Favorite Cuisines',
    prioritizeRecommendations: "We'll prioritize these in your recommendations",
    savePreferences: 'Save Preferences',

    // Login
    joinAte: 'Join ATE!',
    welcomeBackLogin: 'Welcome Back!',
    createAccount: 'Create Account',
    signInContinue: 'Sign In',
    password: 'Password',
    enterPassword: 'Enter your password',
    enterName: 'Enter your name',
    enterEmail: 'Enter your email',
    alreadyHaveAccount: 'Already have an account? Sign In',
    noAccount: "Don't have an account? Sign Up",
    skipForNow: 'Skip for now',

    // Notifications/Deals
    dealsPromotions: 'Deals & Promotions',
    saveBig: 'Save big on your favorite foods!',
    useDeal: 'Use Deal',
    used: 'Used',
    wantMoreDeals: 'Want more deals?',
    setPreferences: 'Set your preferences to get personalized offers',
    updatePreferences: 'Update Preferences',

    // Restaurant details
    locationContact: 'Location & Contact',
    away: 'away',
    openInGoogleMaps: 'Open in Google Maps',
    menu: 'Menu',
    specialDealAvailable: 'Special Deal Available!',
    checkDealsTab: 'Check the Deals tab for current promotions',

    // Common
    goBack: 'Go back to home',
    restaurantNotFound: 'Restaurant not found',

    // Food category translations for mappings
    allfoods: 'All Foods',
  },
  th: {
    // App name
    appName: 'ATE!',

    // Navigation
    home: 'หน้าหลัก',
    spin: 'สุ่ม',
    deals: 'โปรโมชั่น',
    settings: 'ตั้งค่า',

    // Home page
    welcomeBack: 'ยินดีต้อนรับกลับมา',
    whatCraving: 'คุณอยากทานอะไร?',
    tapCategory: 'แตะหมวดหมู่บนแผนที่หรือกรองด้านล่าง',
    quickFilter: 'กรองด่วน',
    priceRange: 'ช่วงราคา',
    showing: 'กำลังแสดง',
    matchingRestaurants: 'ร้านอาหารที่ตรงกัน',
    nearbyRestaurants: 'ร้านอาหารใกล้เคียง',
    found: 'พบ',
    signInPrompt: 'ลงชื่อเข้าใช้เพื่อรับคำแนะนำเฉพาะบุคคล!',
    signInSignUp: 'ลงชื่อเข้าใช้ / สมัครสมาชิก',
    skip: 'ข้าม',

    // Categories
    mains: 'อาหารจานหลัก',
    sides: 'เครื่องเคียง',
    desserts: 'ของหวาน',

    // Spin wheel
    whatShouldEat: 'คุณควรทานอะไร?',
    chooseCategory: 'เลือกหมวดหมู่แล้วหมุน!',
    category: 'หมวดหมู่',
    optionsAvailable: 'ตัวเลือกที่มี',
    spinning: 'กำลังหมุน...',
    spinWheel: 'หมุนวงล้อ!',
    youShouldEat: 'คุณควรทาน...',
    nearbySpots: 'ใกล้เคียง',
    proTip: 'เคล็ดลับ:',
    chooseCategoryFilter: 'เลือกหมวดหมู่เพื่อกรองตัวเลือกของคุณ!',

    // Food categories
    allFoods: 'อาหารทั้งหมด',
    savory: 'เค็ม',
    sweet: 'หวาน',
    breakfast: 'อาหารเช้า',

    // Settings
    customizeExperience: 'ปรับแต่งประสบการณ์ ATE! ของคุณ',
    profile: 'โปรไฟล์',
    manageAccount: 'จัดการบัญชีของคุณ',
    foodPreferences: 'ความชอบอาหาร',
    dietaryAllergies: 'อาหารและการแพ้',
    appSettings: 'การตั้งค่าแอป',
    pushNotifications: 'การแจ้งเตือน',
    getDealsUpdates: 'รับข้อเสนอและอัปเดต',
    locationServices: 'บริการตำแหน่ง',
    findNearbyRestaurants: 'ค้นหาร้านอาหารใกล้เคียง',
    gettingLocation: 'กำลังรับตำแหน่ง...',
    enableLocationAccess: 'เปิดใช้งานการเข้าถึงตำแหน่ง',
    darkMode: 'โหมดมืด',
    toggleDarkTheme: 'สลับธีมมืด',
    distanceUnit: 'หน่วยระยะทาง',
    language: 'ภาษา',
    selectLanguage: 'เลือกภาษาที่คุณต้องการ',
    about: 'เกี่ยวกับ ATE!',
    version: 'เวอร์ชัน',

    // Profile
    manageAccountInfo: 'จัดการข้อมูลบัญชีของคุณ',
    fullName: 'ชื่อเต็ม',
    email: 'อีเมล',
    phoneNumber: 'หมายเลขโทรศัพท์',
    location: 'ตำแหน่ง',
    saveChanges: 'บันทึกการเปลี่ยนแปลง',
    accountStats: 'สถิติบัญชี',
    favorites: 'รายการโปรด',
    reviews: 'รีวิว',
    dealsUsed: 'โปรโมชั่นที่ใช้',
    signOut: 'ออกจากระบบ',

    // Preferences
    yourFoodPreferences: 'ความชอบอาหารของคุณ',
    helpFindPerfectMeal: 'ช่วยเราค้นหาอาหารที่สมบูรณ์แบบสำหรับคุณ',
    dietaryPreferences: 'ความชอบด้านอาหาร',
    selectAllApply: 'เลือกทั้งหมดที่เกี่ยวข้องกับอาหารของคุณ',
    allergiesSensitivities: 'อาหารที่แพ้และความไวต่ออาหาร',
    excludeFromResults: 'เราจะแยกสิ่งเหล่านี้ออกจากผลลัพธ์ของคุณ',
    customPriceRange: 'ช่วงราคาที่กำหนดเอง',
    minPrice: 'ราคาต่ำสุด',
    maxPrice: 'ราคาสูงสุด',
    averagingPerPerson: 'ร้านอาหารโดยเฉลี่ย',
    perPerson: 'ต่อคน',
    favoriteCuisines: 'อาหารที่ชื่นชอบ',
    prioritizeRecommendations: 'เราจะจัดลำดับความสำคัญเหล่านี้ในคำแนะนำของคุณ',
    savePreferences: 'บันทึกความชอบ',

    // Login
    joinAte: 'เข้าร่วม ATE!',
    welcomeBackLogin: 'ยินดีต้อนรับกลับมา!',
    createAccount: 'สร้างบัญชี',
    signInContinue: 'ลงชื่อเข้าใช้',
    password: 'รหัสผ่าน',
    enterPassword: 'ป้อนรหัสผ่านของคุณ',
    enterName: 'ป้อนชื่อของคุณ',
    enterEmail: 'ป้อนอีเมลของคุณ',
    alreadyHaveAccount: 'มีบัญชีอยู่แล้ว? ลงชื่อเข้าใช้',
    noAccount: 'ไม่มีบัญชี? สมัครสมาชิก',
    skipForNow: 'ข้ามตอนนี้',

    // Notifications/Deals
    dealsPromotions: 'โปรโมชั่นและข้อเสนอ',
    saveBig: 'ประหยัดมากในอาหารที่คุณชื่นชอบ!',
    useDeal: 'ใช้โปรโมชั่น',
    used: 'ใช้แล้ว',
    wantMoreDeals: 'ต้องการโปรโมชั่นเพิ่มเติม?',
    setPreferences: 'ตั้งค่าความชอบของคุณเพื่อรับข้อเสนอเฉพาะบุคคล',
    updatePreferences: 'อัปเดตความชอบ',

    // Restaurant details
    locationContact: 'ที่ตั้งและการติดต่อ',
    away: 'ห่าง',
    openInGoogleMaps: 'เปิดใน Google Maps',
    menu: 'เมนู',
    specialDealAvailable: 'มีโปรโมชั่นพิเศษ!',
    checkDealsTab: 'ตรวจสอบแท็บโปรโมชั่นสำหรับข้อเสนอปัจจุบัน',

    // Common
    goBack: 'กลับไปที่หน้าหลัก',
    restaurantNotFound: 'ไม่พบร้านอาหาร',

    // Food category translations for mappings
    allfoods: 'อาหารทั้งหมด',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ate_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ate_language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
];
