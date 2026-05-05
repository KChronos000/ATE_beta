export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  cuisine: string;
  distance: number;
  lat: number;
  lng: number;
  isVegan: boolean;
  isHalal: boolean;
  isKosher: boolean;
  deals: boolean;
  foodTypes: string[];
  priceLevel: number;
  image?: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Spice Garden',
    rating: 4.8,
    cuisine: 'Indian',
    distance: 0.5,
    lat: 40.7589,
    lng: -73.9851,
    isVegan: true,
    isHalal: true,
    isKosher: false,
    deals: true,
    foodTypes: ['curry', 'main course', 'appetizers', 'sides'],
    priceLevel: 2
  },
  {
    id: 2,
    name: 'Sunny Cafe',
    rating: 4.5,
    cuisine: 'Breakfast',
    distance: 1.2,
    lat: 40.7614,
    lng: -73.9776,
    isVegan: false,
    isHalal: false,
    isKosher: false,
    deals: false,
    foodTypes: ['breakfast', 'drinks', 'desserts'],
    priceLevel: 2
  },
  {
    id: 3,
    name: 'The Green Bowl',
    rating: 4.9,
    cuisine: 'Vegan',
    distance: 0.8,
    lat: 40.7580,
    lng: -73.9855,
    isVegan: true,
    isHalal: false,
    isKosher: false,
    deals: true,
    foodTypes: ['salad', 'main course', 'sides', 'drinks'],
    priceLevel: 2
  },
  {
    id: 4,
    name: "Mario's Pizzeria",
    rating: 4.7,
    cuisine: 'Italian',
    distance: 0.3,
    lat: 40.7595,
    lng: -73.9840,
    isVegan: false,
    isHalal: false,
    isKosher: false,
    deals: true,
    foodTypes: ['pizza', 'main course', 'sides'],
    priceLevel: 1
  },
  {
    id: 5,
    name: 'Sakura Sushi',
    rating: 4.6,
    cuisine: 'Japanese',
    distance: 1.5,
    lat: 40.7621,
    lng: -73.9765,
    isVegan: false,
    isHalal: false,
    isKosher: false,
    deals: false,
    foodTypes: ['sushi', 'ramen', 'main course', 'appetizers'],
    priceLevel: 3
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    rating: 4.4,
    cuisine: 'Mexican',
    distance: 0.6,
    lat: 40.7575,
    lng: -73.9870,
    isVegan: false,
    isHalal: true,
    isKosher: false,
    deals: true,
    foodTypes: ['tacos', 'main course', 'sides', 'drinks'],
    priceLevel: 1
  },
  {
    id: 7,
    name: 'Burger Palace',
    rating: 4.3,
    cuisine: 'American',
    distance: 0.9,
    lat: 40.7605,
    lng: -73.9830,
    isVegan: false,
    isHalal: false,
    isKosher: false,
    deals: false,
    foodTypes: ['burger', 'main course', 'sides', 'drinks'],
    priceLevel: 2
  },
  {
    id: 8,
    name: 'Pasta Paradise',
    rating: 4.8,
    cuisine: 'Italian',
    distance: 1.1,
    lat: 40.7610,
    lng: -73.9790,
    isVegan: false,
    isHalal: false,
    isKosher: false,
    deals: false,
    foodTypes: ['pasta', 'main course', 'desserts'],
    priceLevel: 3
  },
  {
    id: 9,
    name: 'Sweet Treats',
    rating: 4.7,
    cuisine: 'Desserts',
    distance: 0.4,
    lat: 40.7585,
    lng: -73.9845,
    isVegan: true,
    isHalal: false,
    isKosher: true,
    deals: true,
    foodTypes: ['desserts', 'drinks'],
    priceLevel: 2
  },
  {
    id: 10,
    name: 'Ramen House',
    rating: 4.6,
    cuisine: 'Japanese',
    distance: 1.3,
    lat: 40.7618,
    lng: -73.9770,
    isVegan: false,
    isHalal: false,
    isKosher: false,
    deals: false,
    foodTypes: ['ramen', 'main course', 'appetizers'],
    priceLevel: 2
  },
];
