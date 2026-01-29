import axiosInstance from './axios.config';
import type { APIResponse, Movie, MovieDetails } from '../../types';

export const moviesApi = {
  // Get trending movies
  getTrending: async (timeWindow: 'day' | 'week' = 'week'): Promise<APIResponse<Movie>> => {
    const response = await axiosInstance.get(`/trending/movie/${timeWindow}`);
    return response.data;
  },

  // Get popular movies
  getPopular: async (page: number = 1): Promise<APIResponse<Movie>> => {
    const response = await axiosInstance.get('/movie/popular', { params: { page } });
    return response.data;
  },

  // Get top rated movies
  getTopRated: async (page: number = 1): Promise<APIResponse<Movie>> => {
    const response = await axiosInstance.get('/movie/top_rated', { params: { page } });
    return response.data;
  },

  // Get now playing movies
  getNowPlaying: async (page: number = 1): Promise<APIResponse<Movie>> => {
    const response = await axiosInstance.get('/movie/now_playing', { params: { page } });
    return response.data;
  },

  // Get upcoming movies
  getUpcoming: async (page: number = 1): Promise<APIResponse<Movie>> => {
    const response = await axiosInstance.get('/movie/upcoming', { params: { page } });
    return response.data;
  },

  // Get movie by genre
  getByGenre: async (genreId: number, page: number = 1): Promise<APIResponse<Movie>> => {
    const response = await axiosInstance.get('/discover/movie', {
      params: { with_genres: genreId, page },
    });
    return response.data;
  },

  // Get movie details
  getDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await axiosInstance.get(`/movie/${movieId}`, {
      params: { append_to_response: 'videos,credits' },
    });
    return response.data;
  },

  // Search movies
  search: async (query: string, page: number = 1): Promise<APIResponse<Movie>> => {
    const response = await axiosInstance.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },
};
