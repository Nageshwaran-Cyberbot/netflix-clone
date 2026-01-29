import axiosInstance from './axios.config';
import type { APIResponse, TVShow } from '../../types';

export const tvShowsApi = {
  // Get trending TV shows
  getTrending: async (timeWindow: 'day' | 'week' = 'week'): Promise<APIResponse<TVShow>> => {
    const response = await axiosInstance.get(`/trending/tv/${timeWindow}`);
    return response.data;
  },

  // Get popular TV shows
  getPopular: async (page: number = 1): Promise<APIResponse<TVShow>> => {
    const response = await axiosInstance.get('/tv/popular', { params: { page } });
    return response.data;
  },

  // Get top rated TV shows
  getTopRated: async (page: number = 1): Promise<APIResponse<TVShow>> => {
    const response = await axiosInstance.get('/tv/top_rated', { params: { page } });
    return response.data;
  },

  // Get TV shows airing today
  getAiringToday: async (page: number = 1): Promise<APIResponse<TVShow>> => {
    const response = await axiosInstance.get('/tv/airing_today', { params: { page } });
    return response.data;
  },

  // Get on the air TV shows
  getOnTheAir: async (page: number = 1): Promise<APIResponse<TVShow>> => {
    const response = await axiosInstance.get('/tv/on_the_air', { params: { page } });
    return response.data;
  },

  // Search TV shows
  search: async (query: string, page: number = 1): Promise<APIResponse<TVShow>> => {
    const response = await axiosInstance.get('/search/tv', {
      params: { query, page },
    });
    return response.data;
  },
};
