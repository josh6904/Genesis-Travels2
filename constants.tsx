
import { Destination } from './types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Maasai Mara Safari',
    country: 'Kenya',
    pricePerDay: 250,
    isAllInclusive: true,
    groupTierPricing: { minGuests: 5, discountPercent: 15 },
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Experience the world-famous migration and luxury tented camps.',
    tags: ['Big Five', 'Luxury', 'Classic'],
    attractions: ['Great Migration', 'Mara River', 'Balloon Safari'],
    rating: 4.9
  },
  {
    id: '2',
    name: 'Diani Beach Retreat',
    country: 'Kenya',
    pricePerDay: 180,
    isAllInclusive: true,
    image: 'https://images.unsplash.com/photo-1589197331516-4d83023021f1?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1589197331516-4d83023021f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Pristine white sands and turquoise waters. The ultimate relaxation.',
    tags: ['Beach', 'Relaxation', 'Snorkeling'],
    attractions: ['Kite Surfing', 'Glass Boat Tours', 'Colobus Trust'],
    rating: 4.8
  },
  {
    id: '3',
    name: 'Amboseli Heritage',
    country: 'Kenya',
    pricePerDay: 210,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Breathtaking views of Kilimanjaro and legendary elephant herds.',
    tags: ['Mountains', 'Photography', 'Wildlife'],
    attractions: ['Elephant Watching', 'Kilimanjaro Views', 'Observation Hill'],
    rating: 4.7
  },
  {
    id: '4',
    name: 'Lamu Swahili Stay',
    country: 'Kenya',
    pricePerDay: 150,
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Step back in time in the narrow streets of a UNESCO heritage town.',
    tags: ['Culture', 'UNESCO', 'Historic'],
    attractions: ['Dhow Sailing', 'Shela Village', 'Old Town Walk'],
    rating: 4.9
  },
  {
    id: '5',
    name: 'Mt. Kenya Climb',
    country: 'Kenya',
    pricePerDay: 290,
    image: 'https://images.unsplash.com/photo-1589196726588-44445300f283?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1589196726588-44445300f283?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'For the bold. Alpine scenery and the peaks of the Equator.',
    tags: ['Climb', 'Elite', 'Alpine'],
    attractions: ['Point Lenana', 'Gorges Valley', 'Lewis Glacier'],
    rating: 4.6
  },
  {
    id: '6',
    name: 'Hell\'s Gate Biking',
    country: 'Kenya',
    pricePerDay: 95,
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Cycling through volcanic gorges and steam vents.',
    tags: ['Biking', 'Day Trip', 'Gorges'],
    attractions: ['Rock Climbing', 'Natural Spas', 'Fisherman\'s Tower'],
    rating: 4.5
  }
];

export const COLORS = {
  primary: '#5d6d4e',
  secondary: '#d4a373',
  accent: '#faedcd',
  dark: '#2d2a26',
  error: '#b91c1c',
  light: '#fcfaf7',
};

export const CONTACT_INFO = {
  address: "Heritage House, Karen, Nairobi, Kenya",
  email: "hello@genesiskenya.com",
  phone: "+254 700 000 000",
  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@genesis_kenya", icon: "Instagram" },
    { name: "X", url: "https://x.com", handle: "@genesis_wild", icon: "Twitter" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "Genesis Kenya", icon: "Linkedin" }
  ]
};
