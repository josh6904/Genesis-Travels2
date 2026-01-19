
export interface Destination {
  id: string;
  name: string;
  country: string;
  pricePerDay: number;
  image: string;
  gallery: string[];
  description: string;
  tags: string[];
  attractions: string[];
  rating: number;
  isAllInclusive?: boolean;
  groupTierPricing?: {
    minGuests: number;
    discountPercent: number;
  };
}

export interface User {
  name: string;
  email: string;
  referralCode?: string;
  preferences?: string[];
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  guests: number;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  referralCodeUsed?: string;
  createdAt: string;
}

export interface LeadInsight {
  summary: string;
  recommendations: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
}
