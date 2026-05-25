import { SareeProduct, CategoryItem, Review } from '../types';

import heroSareeModel from '../assets/images/hero_saree_model_1779684897918.png';
import kanjeevaramSilk from '../assets/images/kanjeevaram_silk_1779684918206.png';
import designerGeorgette from '../assets/images/designer_georgette_1779684938122.png';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'banarasi',
    name: 'banarasi',
    displayName: 'Banarasi Silk',
    description: 'Weaved in pure gold & silver zari, hailing from the spiritual heart of Varanasi.',
    image: 'https://picsum.photos/seed/banar/800/1000'
  },
  {
    id: 'kanjeevaram',
    name: 'kanjeevaram',
    displayName: 'Kanjeevaram Silk',
    description: 'Temple-inspired majestic borders and pure silk hand-loomed in Tamil Nadu.',
    image: 'https://picsum.photos/seed/kanjeevaram/800/1000'
  },
  {
    id: 'georgette',
    name: 'georgette',
    displayName: 'Designer Georgette',
    description: 'Lightweight flowing masterpieces, beautifully accented with rich hand embroideries.',
    image: 'https://picsum.photos/seed/geor/800/1000'
  },
  {
    id: 'organza',
    name: 'organza',
    displayName: 'Pure Organza',
    description: 'Crisp, translucent elegance featuring gorgeous hand-painted floral elements.',
    image: 'https://picsum.photos/seed/organza/800/1000'
  },
  {
    id: 'linen',
    name: 'linen',
    displayName: 'Handloom Linen',
    description: 'Breathable organic premium linen with shimmering silver and gold borders.',
    image: 'https://picsum.photos/seed/linen6/800/1000'
  },
  {
    id: 'chanderi',
    name: 'chanderi',
    displayName: 'Chanderi Grace',
    description: 'A diaphanous blend of premium cotton and silk with tiny traditional butis.',
    image: 'https://picsum.photos/seed/chanderi/800/1000'
  }
];

export const MOCK_SAREES: SareeProduct[] = [
  {
    id: 'sr01',
    name: 'Royal Shringar Crimson Banarasi Silk',
    price: 38500,
    originalPrice: 45000,
    category: 'banarasi',
    description: 'A masterpiece from Varanasi, this radiant crimson red saree is weaved in authentic pure gold zari threads over fine, thick silk. Featuring a grand kadwa floral vine border and a rich brocade palla, it evokes pure royal heritage.',
    details: [
      'Genuine handloom Banarasi silk (100% natural silk)',
      'Woven with authentic premium gold and silver zari threads',
      'Elaborate heritage design of floral creepers and jaal work',
      'Perfect for bridal attire and special festive occasions',
      'Comes with standard matching premium red unstitched blouse piece (80cm)'
    ],
    fabric: 'Pure Kadwa Katan Silk',
    zariWork: 'Pure Gold',
    craftsmanship: 'Handloom',
    images: [
      heroSareeModel,
      'https://picsum.photos/seed/banar_det1/800/1200',
      'https://picsum.photos/seed/banar_det2/800/1200'
    ],
    colors: [
      { name: 'Heritage Crimson', hex: '#8a1f1f' },
      { name: 'Bridal Red', hex: '#cd3131' }
    ],
    isFeatured: true,
    isTrending: true,
    isCodAvailable: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'sr02',
    name: 'Mayur Mandir Royal Blue Kanjeevaram',
    price: 42000,
    category: 'kanjeevaram',
    description: 'An absolute pride of Tamil Nadu weavers. This saree features a deep royal blue body, contrasting majestically with an extensive gold-woven ruby pallu. Styled with classical temple motifs (gopurams) and peacock carvings embedded in the premium gold zari border.',
    details: [
      'Authentic Kanchipuram pure mulberry silk',
      'Durable double warp (heavy silk body)',
      'Intricate temple-carved border with traditional mayur (peacock) motifs',
      'Interlocked border joints (Korvai weave technique)',
      'Includes contrasting rich magenta-red silk unstitched blouse material'
    ],
    fabric: 'Kanchipuram Double Warp Silk',
    zariWork: 'Pure Gold',
    craftsmanship: 'Handloom',
    images: [
      kanjeevaramSilk,
      'https://picsum.photos/seed/kanjee_det1/800/1200',
      'https://picsum.photos/seed/kanjee_det2/800/1200'
    ],
    colors: [
      { name: 'Royal Sapphire', hex: '#1e3a8a' },
      { name: 'Peacock Teal', hex: '#0d9488' }
    ],
    isFeatured: true,
    isTrending: true,
    isCodAvailable: true,
    rating: 5.0,
    reviewsCount: 24
  },
  {
    id: 'sr03',
    name: 'Gulabi Sehar Pastel Pink Georgette',
    price: 18900,
    originalPrice: 22800,
    category: 'georgette',
    description: 'Elegance meets lightweight perfection. This georgette designer wear boasts beautiful pastel pink tones decorated with modern fine silver thread-work and scattered sequin sparkles. Flattering drape with high fluidity, perfect for cocktail evenings.',
    details: [
      'Premium fluid viscose georgette base fabric',
      'Delicate hand-embroidered floral vines with tiny light-reflecting sequins',
      'Extremely lightweight, hugs your silhouette with comfort',
      'Modern scalloped edge finishing',
      'Comes with premium matching satin under-skirt and a designer stitched blouse option'
    ],
    fabric: 'Premium Viscose Georgette',
    zariWork: 'Fine Zari',
    craftsmanship: 'Designer Label',
    images: [
      designerGeorgette,
      'https://picsum.photos/seed/geor_det1/800/1200',
      'https://picsum.photos/seed/geor_det2/800/1200'
    ],
    colors: [
      { name: 'Pastel Rose', hex: '#fda4af' },
      { name: 'Champagne Ivory', hex: '#fef3c7' }
    ],
    isFeatured: true,
    isTrending: false,
    isCodAvailable: true,
    rating: 4.7,
    reviewsCount: 19
  },
  {
    id: 'sr04',
    name: 'Vaikuntha Emerald Green Banarasi',
    price: 36000,
    originalPrice: 41000,
    category: 'banarasi',
    description: 'A striking emerald green drape with detailed leaf motifs (shikargah) woven inside an antique silver zari background. Brings out an old-world aristocratic vibe that is popular for winter weddings.',
    details: [
      'Rich emerald green high-sheen silk fabric',
      'Authentic antique oxidised silver zari weave',
      'Detailed leaf motifs, birds, and forest elements weaved in the border',
      'Rich structured pallu with dense, fine floral weave',
      'Unstitched plain green silk blouse with silver border included'
    ],
    fabric: 'Katan Silk',
    zariWork: 'Antique',
    craftsmanship: 'Handloom',
    images: [
      'https://picsum.photos/seed/green_banar/800/1200',
      'https://picsum.photos/seed/green_banar_p2/800/1200'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#0f766e' },
      { name: 'Deep Olive', hex: '#3f6212' }
    ],
    isFeatured: false,
    isTrending: true,
    isCodAvailable: true,
    rating: 4.8,
    reviewsCount: 15
  },
  {
    id: 'sr05',
    name: 'Gul-o-Bahar Hand-Painted Floral Organza',
    price: 15500,
    originalPrice: 18500,
    category: 'organza',
    description: 'Airy, sheer, and incredibly graceful. A fine organza saree in warm apricot-peach base color, featuring exquisite hand-painted watercolor roses and delicate gilded borders. Ideal for daytime brunches & summer festivities.',
    details: [
      'Sheer and crisp premium silk organza tissue',
      'Exclusive hand-painted botanical rose motifs (each saree unique)',
      'Subtle thin gold dust border lines',
      'Highly photogenic, holds a light, structured flare',
      'Includes plain contrast crepe silk blouse piece'
    ],
    fabric: 'Pure Silk Organza',
    zariWork: 'Minimalist',
    craftsmanship: 'Designer Label',
    images: [
      'https://picsum.photos/seed/organza_pe/800/1200',
      'https://picsum.photos/seed/organza_pe_p2/800/1200'
    ],
    colors: [
      { name: 'Apricot Peach', hex: '#fed7aa' },
      { name: 'Soft Sage', hex: '#cbd5e1' }
    ],
    isFeatured: false,
    isTrending: true,
    isCodAvailable: true,
    rating: 4.9,
    reviewsCount: 31
  },
  {
    id: 'sr06',
    name: 'Utsav Mustard Handloom Linen',
    price: 8800,
    originalPrice: 10500,
    category: 'linen',
    description: 'The luxury of pure breathable fibers. Woven with organic linen yarns, this refreshing mustard-yellow saree is highlighted by handloom silver zari borders and modern striped threads in the pallu. Chic and effortless.',
    details: [
      '100 count pure organic premium flax linen',
      'Natural breathing fibers with highly skin-friendly texture',
      'Silver zari plain border with hand-knotted tassels on the pallu',
      'Minimal and elegant contemporary aesthetic',
      'Blouse: matching striped unstitched linen fabric'
    ],
    fabric: '100% Organic Flax Linen',
    zariWork: 'Tested Zari',
    craftsmanship: 'Handloom',
    images: [
      'https://picsum.photos/seed/linen_m/800/1200',
      'https://picsum.photos/seed/linen_m_p2/800/1200'
    ],
    colors: [
      { name: 'Mustard Gold', hex: '#d97706' },
      { name: 'Natural Sand', hex: '#f5f5f4' }
    ],
    isFeatured: false,
    isTrending: false,
    isCodAvailable: false,
    rating: 4.6,
    reviewsCount: 12
  },
  {
    id: 'sr07',
    name: 'Chanderi Shuri Golden-Beige Silk-Cotton',
    price: 11200,
    category: 'chanderi',
    description: 'A classic Chanderi saree with a gossamer texture, beautifully merging high-quality silk sheen with comfortable cotton breathability. Studded with delicate golden ashraf butis (coin motifs) all over.',
    details: [
      'Traditional Chanderi weave (60% Silk, 40% Cotton)',
      'Signature sheer translucent fall',
      'Intricate golden embroidery coin motifs (ashrafi buti)',
      'Elegant narrow zari border',
      'Includes plain running Chanderi blouse fabric'
    ],
    fabric: 'Chanderi Silk Cotton',
    zariWork: 'Fine Zari',
    craftsmanship: 'Handloom',
    images: [
      'https://picsum.photos/seed/chanderi_be/800/1200',
      'https://picsum.photos/seed/chanderi_be_p2/800/1200'
    ],
    colors: [
      { name: 'Golden Beige', hex: '#eab308' },
      { name: 'Ivory Cream', hex: '#fefaf0' }
    ],
    isFeatured: true,
    isTrending: false,
    isCodAvailable: true,
    rating: 4.7,
    reviewsCount: 16
  },
  {
    id: 'sr08',
    name: 'Vaibhavi Imperial Crimson Bridal Kanjeevaram',
    price: 52000,
    originalPrice: 58000,
    category: 'kanjeevaram',
    description: 'This is the crown jewel of our bridal section. A heavy silk Kanjeevaram wedding saree in deep vermilion red, decorated with complete rich jaal work of pure silver and gold dual-tonal zari and classical temple patterns. Unrivaled grandeur.',
    details: [
      'Premium triple-ply heavy Mulberry silk drape',
      'Bespoke gold-dipped silver zari weave spanning the whole body',
      'Detailed panels of wedding ceremonial scenes woven in the grand pallu',
      'Durable, structured crease resisting, weight of approx. 1kg of sheer textile art',
      'Comes with an exclusive embroidered silk bridal blouse piece'
    ],
    fabric: 'Classic Kanchipuram heavy Silk',
    zariWork: 'Pure Gold',
    craftsmanship: 'Handloom',
    images: [
      'https://picsum.photos/seed/kanjee_red/800/1200',
      'https://picsum.photos/seed/kanjee_red_p2/800/1200'
    ],
    colors: [
      { name: 'Vermilion Bridal Red', hex: '#b91c1c' },
      { name: 'Deep Burgundy', hex: '#7f1d1d' }
    ],
    isFeatured: false,
    isTrending: true,
    isCodAvailable: true,
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: 'sr09',
    name: 'Lilac Dream Floral Designer Organza',
    price: 14800,
    category: 'organza',
    description: 'Exude a youthful breeze in this beautiful lilac organza saree, embellished with handloom satin borders and delicate lilac floral printed designs with silver thread outlines. Draped like air.',
    details: [
      'Weightless translucent silk organza base',
      'Satin border piping for high stability and fall definition',
      'Exclusive pastel floral imagery with elegant outline threading',
      'Stately modern aesthetic for daytime events',
      'Includes metallic silk unstitched blouse piece'
    ],
    fabric: 'Silk Organza',
    zariWork: 'Minimalist',
    craftsmanship: 'Designer Label',
    images: [
      'https://picsum.photos/seed/org_lilac/800/1200',
      'https://picsum.photos/seed/org_lilac_p2/800/1200'
    ],
    colors: [
      { name: 'Soft Lilac', hex: '#d8b4fe' },
      { name: 'Mint Green Accent', hex: '#86efac' }
    ],
    isFeatured: false,
    isTrending: false,
    isCodAvailable: true,
    rating: 4.8,
    reviewsCount: 11
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rv01',
    author: 'Anjali Sharma',
    rating: 5,
    date: '2026-04-18',
    comment: 'The Royal Shringar Banarasi saree is absolutely breathtaking. The pure silk feel is incomparably soft yet holds a beautiful weight. The gold weaving shines elegantly in indoor lighting. Everyone on my wedding events complimented me!',
    avatarUrl: 'https://picsum.photos/seed/anjali/100/100'
  },
  {
    id: 'rv02',
    author: 'Meenakshi Iyer',
    rating: 5,
    date: '2026-05-02',
    comment: 'Pure Korvai weave of Kanjeevaram was spot on. I ordered a saree worth 42000 INR and was a bit nervous to buy online, but the demo-web was extremely coordinates and video-called me on WhatsApp to show the textures first. Delivery was fast too!',
    avatarUrl: 'https://picsum.photos/seed/meena/100/100'
  },
  {
    id: 'rv03',
    author: 'Priyanka Sen',
    rating: 4,
    date: '2026-05-14',
    comment: 'Stunning georgette saree, the colors look identical to photos. Delivery took about 4 days to Kolkata, but the custom blouse stitches fit like a glove. Highly recommended for premium demo-web items!',
    avatarUrl: 'https://picsum.photos/seed/priyanka/100/100'
  },
  {
    id: 'rv04',
    author: 'Sunitha Reddy',
    rating: 5,
    date: '2026-05-20',
    comment: 'Organic linen model saree is exceptionally comfortable to wear in high summer. Extremely minimal design yet very sophisticated look. Going to buy another variant in apricot!',
    avatarUrl: 'https://picsum.photos/seed/sunitha/100/100'
  }
];
