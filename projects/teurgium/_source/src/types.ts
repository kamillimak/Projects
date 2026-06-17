/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'sly-2cm' | 'sly-4cm' | 'wsporniki' | 'kostka' | 'kruszywa';
  categoryName: string;
  subcategory?: string;
  description: string;
  priceRange: string;
  features: string[];
  imageUrl: string;
  dimensions: string[];
  colors: string[];
  textures: string[];
  faq?: Array<{ question: string; answer: string }>;
}

export interface InquiryItem {
  product: Product;
  color: string;
  texture: string;
  quantity: string; // m² or items
  deliveryTime: string; // e.g. "Do 2 tygodni", "Do miesiąca", "Pilne"
}

export interface RFQSubmission {
  items: InquiryItem[];
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientLocation: string;
  clientDescription: string;
  topic?: string;
}

export interface Realisation {
  id: string;
  title: string;
  category: 'tarasy' | 'podjazdy' | 'schody' | 'ogrod';
  imageUrl: string;
  location: string;
  materialsUsed: string[];
  description: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
  imageUrl: string;
  publishDate: string;
}
