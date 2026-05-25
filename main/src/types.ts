export interface SareeProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'banarasi' | 'kanjeevaram' | 'georgette' | 'linen' | 'organza' | 'chanderi';
  description: string;
  details: string[];
  fabric: string;
  zariWork: 'Pure Gold' | 'Fine Zari' | 'Tested Zari' | 'Antique' | 'Minimalist' | 'None';
  craftsmanship: 'Handloom' | 'Powerloom' | 'Designer Label';
  images: string[];
  colors: { name: string; hex: string }[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isCodAvailable?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatarUrl?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  displayName: string;
  description: string;
  image: string;
}
