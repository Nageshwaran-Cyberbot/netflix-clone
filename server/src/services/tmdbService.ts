import axios from 'axios';
import { config } from '../config/env.js';

const tmdbAxios = axios.create({
  baseURL: config.tmdbBaseUrl,
  params: {
    api_key: config.tmdbApiKey,
  },
});

// Movie services
export const movieService = {
  getTrending: async (timeWindow: 'day' | 'week' = 'week') => {
    const response = await tmdbAxios.get(`/trending/movie/${timeWindow}`);
    return response.data;
  },

  getPopular: async (page: number = 1) => {
    const response = await tmdbAxios.get('/movie/popular', { params: { page } });
    return response.data;
  },

  getTopRated: async (page: number = 1) => {
    const response = await tmdbAxios.get('/movie/top_rated', { params: { page } });
    return response.data;
  },

  getNowPlaying: async (page: number = 1) => {
    const response = await tmdbAxios.get('/movie/now_playing', { params: { page } });
    return response.data;
  },

  getUpcoming: async (page: number = 1) => {
    const response = await tmdbAxios.get('/movie/upcoming', { params: { page } });
    return response.data;
  },

  getDetails: async (movieId: number) => {
    const response = await tmdbAxios.get(`/movie/${movieId}`, {
      params: { append_to_response: 'videos,credits' },
    });
    return response.data;
  },

  search: async (query: string, page: number = 1) => {
    const response = await tmdbAxios.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },
};

// TV Show services
export const tvService = {
  getTrending: async (timeWindow: 'day' | 'week' = 'week') => {
    const response = await tmdbAxios.get(`/trending/tv/${timeWindow}`);
    return response.data;
  },

  getPopular: async (page: number = 1) => {
    const response = await tmdbAxios.get('/tv/popular', { params: { page } });
    return response.data;
  },

  getTopRated: async (page: number = 1) => {
    const response = await tmdbAxios.get('/tv/top_rated', { params: { page } });
    return response.data;
  },

  getAiringToday: async (page: number = 1) => {
    const response = await tmdbAxios.get('/tv/airing_today', { params: { page } });
    return response.data;
  },

  getOnTheAir: async (page: number = 1) => {
    const response = await tmdbAxios.get('/tv/on_the_air', { params: { page } });
    return response.data;
  },

  getDetails: async (tvId: number) => {
    const response = await tmdbAxios.get(`/tv/${tvId}`, {
      params: { append_to_response: 'videos,credits' },
    });
    return response.data;
  },

  search: async (query: string, page: number = 1) => {
    const response = await tmdbAxios.get('/search/tv', {
      params: { query, page },
    });
    return response.data;
  },
};

export default tmdbAxios;
