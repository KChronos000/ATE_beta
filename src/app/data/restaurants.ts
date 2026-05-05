export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

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
  avgPrice: number;
  image?: string;
  address: string;
  phone: string;
  hours: string;
  menu: MenuItem[];
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
    priceLevel: 2,
    avgPrice: 18,
    address: '123 Main St, New York, NY 10001',
    phone: '(212) 555-0101',
    hours: '11:00 AM - 10:00 PM',
    menu: [
      { id: 1, name: 'Butter Chicken', description: 'Tender chicken in creamy tomato sauce', price: 16, category: 'Main Course' },
      { id: 2, name: 'Vegetable Biryani', description: 'Fragrant rice with mixed vegetables', price: 14, category: 'Main Course' },
      { id: 3, name: 'Samosas', description: 'Crispy pastries filled with spiced potatoes', price: 6, category: 'Appetizers' },
      { id: 4, name: 'Naan Bread', description: 'Fresh baked flatbread', price: 3, category: 'Sides' },
      { id: 5, name: 'Gulab Jamun', description: 'Sweet milk dumplings in syrup', price: 5, category: 'Desserts' },
    ]
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
    priceLevel: 2,
    avgPrice: 12,
    address: '456 Broadway, New York, NY 10012',
    phone: '(212) 555-0102',
    hours: '7:00 AM - 3:00 PM',
    menu: [
      { id: 6, name: 'Pancakes', description: 'Fluffy buttermilk pancakes with maple syrup', price: 10, category: 'Breakfast' },
      { id: 7, name: 'Avocado Toast', description: 'Smashed avocado on sourdough', price: 12, category: 'Breakfast' },
      { id: 8, name: 'Fresh Coffee', description: 'Locally roasted arabica beans', price: 4, category: 'Drinks' },
      { id: 9, name: 'Blueberry Muffin', description: 'Homemade with fresh blueberries', price: 5, category: 'Desserts' },
    ]
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
    priceLevel: 2,
    avgPrice: 15,
    address: '789 5th Ave, New York, NY 10003',
    phone: '(212) 555-0103',
    hours: '10:00 AM - 9:00 PM',
    menu: [
      { id: 10, name: 'Buddha Bowl', description: 'Quinoa, roasted veggies, tahini dressing', price: 14, category: 'Main Course' },
      { id: 11, name: 'Kale Caesar Salad', description: 'Fresh kale with vegan caesar dressing', price: 12, category: 'Salad' },
      { id: 12, name: 'Sweet Potato Fries', description: 'Crispy baked fries', price: 6, category: 'Sides' },
      { id: 13, name: 'Green Smoothie', description: 'Spinach, banana, mango, almond milk', price: 8, category: 'Drinks' },
    ]
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
    priceLevel: 1,
    avgPrice: 12,
    address: '321 Pizza St, New York, NY 10004',
    phone: '(212) 555-0104',
    hours: '11:00 AM - 11:00 PM',
    menu: [
      { id: 14, name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, basil', price: 14, category: 'Pizza' },
      { id: 15, name: 'Pepperoni Pizza', description: 'Loaded with pepperoni', price: 16, category: 'Pizza' },
      { id: 16, name: 'Garlic Knots', description: 'Soft bread knots with garlic butter', price: 5, category: 'Sides' },
      { id: 17, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7, category: 'Desserts' },
    ]
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
    priceLevel: 3,
    avgPrice: 35,
    address: '555 Sushi Ln, New York, NY 10005',
    phone: '(212) 555-0105',
    hours: '12:00 PM - 10:00 PM',
    menu: [
      { id: 18, name: 'Salmon Nigiri', description: 'Fresh salmon over rice', price: 8, category: 'Sushi' },
      { id: 19, name: 'California Roll', description: 'Crab, avocado, cucumber', price: 12, category: 'Sushi' },
      { id: 20, name: 'Miso Soup', description: 'Traditional fermented soybean soup', price: 4, category: 'Appetizers' },
    ]
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
    priceLevel: 1,
    avgPrice: 10,
    address: '888 Taco Blvd, New York, NY 10006',
    phone: '(212) 555-0106',
    hours: '11:00 AM - 9:00 PM',
    menu: [
      { id: 21, name: 'Beef Tacos', description: 'Seasoned beef with fresh toppings', price: 9, category: 'Tacos' },
      { id: 22, name: 'Chicken Quesadilla', description: 'Grilled chicken and cheese', price: 11, category: 'Main Course' },
      { id: 23, name: 'Chips & Guacamole', description: 'Fresh made daily', price: 6, category: 'Sides' },
    ]
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
    priceLevel: 2,
    avgPrice: 16,
    address: '999 Burger Ave, New York, NY 10007',
    phone: '(212) 555-0107',
    hours: '11:00 AM - 10:00 PM',
    menu: [
      { id: 24, name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion', price: 14, category: 'Burger' },
      { id: 25, name: 'Bacon Cheeseburger', description: 'With crispy bacon and cheddar', price: 16, category: 'Burger' },
      { id: 26, name: 'French Fries', description: 'Crispy golden fries', price: 5, category: 'Sides' },
    ]
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
    priceLevel: 3,
    avgPrice: 28,
    address: '111 Pasta Way, New York, NY 10008',
    phone: '(212) 555-0108',
    hours: '5:00 PM - 11:00 PM',
    menu: [
      { id: 27, name: 'Fettuccine Alfredo', description: 'Creamy parmesan sauce', price: 22, category: 'Pasta' },
      { id: 28, name: 'Spaghetti Carbonara', description: 'Bacon, egg, parmesan', price: 24, category: 'Pasta' },
      { id: 29, name: 'Cannoli', description: 'Sweet ricotta filled pastry', price: 8, category: 'Desserts' },
    ]
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
    priceLevel: 2,
    avgPrice: 8,
    address: '222 Sweet St, New York, NY 10009',
    phone: '(212) 555-0109',
    hours: '9:00 AM - 8:00 PM',
    menu: [
      { id: 30, name: 'Chocolate Cake', description: 'Rich dark chocolate layers', price: 7, category: 'Desserts' },
      { id: 31, name: 'Ice Cream Sundae', description: 'Three scoops with toppings', price: 9, category: 'Desserts' },
      { id: 32, name: 'Milkshake', description: 'Thick and creamy', price: 6, category: 'Drinks' },
    ]
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
    priceLevel: 2,
    avgPrice: 16,
    address: '333 Ramen Rd, New York, NY 10010',
    phone: '(212) 555-0110',
    hours: '11:30 AM - 10:00 PM',
    menu: [
      { id: 33, name: 'Tonkotsu Ramen', description: 'Rich pork bone broth', price: 16, category: 'Ramen' },
      { id: 34, name: 'Spicy Miso Ramen', description: 'Miso broth with chili oil', price: 17, category: 'Ramen' },
      { id: 35, name: 'Gyoza', description: 'Pan-fried dumplings', price: 7, category: 'Appetizers' },
    ]
  },
];
