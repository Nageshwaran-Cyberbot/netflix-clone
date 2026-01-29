import { useState, useEffect } from 'react';
import type { Movie } from '../types';
import { moviesApi } from '../services/api/movies.api';

export const useMovies = (category: 'trending' | 'popular' | 'topRated' | 'nowPlaying' | 'upcoming') => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        switch (category) {
          case 'trending':
            response = await moviesApi.getTrending();
            break;
          case 'popular':
            response = await moviesApi.getPopular();
            break;
          case 'topRated':
            response = await moviesApi.getTopRated();
            break;
          case 'nowPlaying':
            response = await moviesApi.getNowPlaying();
            break;
          case 'upcoming':
            response = await moviesApi.getUpcoming();
            break;
          default:
            response = await moviesApi.getPopular();
        }
        
        setMovies(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return { movies, loading, error };
};
