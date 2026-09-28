/**
 * Art Store & Exhibition Data Models
 */

export type ArtCategory = 'all' | 'painting' | 'print' | 'sculpture' | 'atelier';

export type ArtStyle = 
  | 'Abstract Expressionism'
  | 'Neo-Impressionism'
  | 'Minimalist'
  | 'Figurative'
  | 'Contemporary'
  | 'Classical Realism'
  | 'Botanical & Organic';

export type Orientation = 'landscape' | 'portrait' | 'square';

export interface FrameOption {
  id: string;
  name: string;
  price: number;
  description: string;
  cssBorder: string;
  material: string;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistNationality: string;
  artistBio: string;
  category: 'painting' | 'print' | 'sculpture' | 'atelier';
  style: ArtStyle;
  medium: string;
  dimensions: {
    widthCm: number;
    heightCm: number;
    depthCm?: number;
    imperial: string;
  };
  year: number;
  price: number;
  image: string;
  fallbackGradient?: string;
  description: string;
  provenance: string[];
  certificateDetails: string;
  edition: string;
  inStock: boolean;
  stockCount: number;
  isFeaturedExhibition?: boolean;
  orientation: Orientation;
  framingCompatible: boolean;
  exhibitionRoomNote?: string;
}

export interface CartItem {
  cartItemId: string;
  artwork: Artwork;
  quantity: number;
  selectedFrame: FrameOption;
  unitPrice: number;
  itemTotal: number;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    collectorNotes?: string;
  };
  paymentMethod: string;
  createdAt: string;
  authenticityRecordHash: string;
}
