import axios from 'axios';
import { Product, Category, Testimonial, BlogPost } from '@/types/types';

export const fetchProducts = async (baseUrl = ''): Promise<Product[]> => {
  const res = await axios.get(`${baseUrl}/api/products`);
  return res.data;
};

export const fetchCategories = async (baseUrl = ''): Promise<Category[]> => {
  const res = await axios.get(`${baseUrl}/api/categories`);
  return res.data;
};

export const fetchTestimonials = async (baseUrl = ''): Promise<Testimonial[]> => {
  const res = await axios.get(`${baseUrl}/api/testimonials`);
  return res.data;
};

export const fetchPosts = async (baseUrl = ''): Promise<BlogPost[]> => {
  const res = await axios.get(`${baseUrl}/api/posts`);
  return res.data;
};

export const fetchPost = async (baseUrl = '', id: string): Promise<BlogPost[]> => {
  const res = await axios.get(`${baseUrl}/api/post/${id}`);
  return res.data;
};

export const fetchProduct = async (baseUrl = '', id: string): Promise<Product[]> => {
  const res = await axios.get(`${baseUrl}/api/product/${id}`);
  return res.data;
};
