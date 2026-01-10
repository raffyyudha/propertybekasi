
export enum PropertyType {
  RUMAH = 'Rumah',
  RUKO = 'Ruko',
  TANAH = 'Tanah',
  VILLA = 'Villa',
  GUDANG = 'Gudang'
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: PropertyType;
  landArea: number; // LT
  buildingArea: number; // LB
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  carport?: number;
  electricity?: number; // Watt
  water?: string; // PAM / Jetpump
  orientation?: string; // Utara, Selatan, etc.
  certificate?: string; // SHM, HGB, etc.
  furniture?: string; // Furnished, Semi, Unfurnished
  yearBuilt?: number;
  images: string[];
  description: string;
  isFeatured?: boolean;
  isPromo?: boolean;
  mapUrl?: string; // Google Maps Embed URL
  nearbyAccess?: string; // Multiline text for nearby access points
}

export interface SearchFilters {
  query: string;
  type: string;
  minPrice: string;
  maxPrice: string;
}

export interface Story {
  id: string;
  created_at?: string;
  title: string;
  image_url: string;
  link_url?: string;
  display_order: number;
  is_active: boolean;
}

