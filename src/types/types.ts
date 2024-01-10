export interface Product {
  category_id: number;
  created_at: Date;
  description: string;
  id: number;
  image_url: string;
  name: string;
  price: number;
  stock: number;
  quantity?: number | undefined;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  testimonial: string;
  rating: number;
  created_at: Date;
}

export interface BlogPost {
  id: number;
  preview: string;
  title: string;
  content: string;
  author: string;
  image_url: string | null;
  created_at: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
  created_at: Date;
}
