import axios from 'axios';
import { Post, PostCreate, PostUpdate } from '../types/post';

const API_BASE_URL = 'http://localhost:8000';  // Adjust if your backend runs on a different port

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blogService = {
  getPosts: (skip = 0, limit = 10) => 
    api.get<Post[]>(`/posts/?skip=${skip}&limit=${limit}`),
  getPost: (id: number) => 
    api.get<Post>(`/posts/${id}`),
  createPost: (data: PostCreate) => 
    api.post<Post>('/posts/', data),
  updatePost: (id: number, data: PostUpdate) => 
    api.put<Post>(`/posts/${id}`, data),
  deletePost: (id: number) => 
    api.delete(`/posts/${id}`),
};