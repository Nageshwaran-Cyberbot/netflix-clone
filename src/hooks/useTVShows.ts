import { useState, useEffect } from 'react';
import type { TVShow } from '../types';
import { tvShowsApi } from '../services/api/tvshows.api';

export const useTVShows = (category: 'trending' | 'popular' | 'topRated' | 'airingToday' | 'onTheAir') => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        switch (category) {
          case 'trending':
            response = await tvShowsApi.getTrending();
            break;
          case 'popular':
            response = await tvShowsApi.getPopular();
            break;
          case 'topRated':
            response = await tvShowsApi.getTopRated();
            break;
          case 'airingToday':
            response = await tvShowsApi.getAiringToday();
            break;
          case 'onTheAir':
            response = await tvShowsApi.getOnTheAir();
            break;
          default:
            response = await tvShowsApi.getPopular();
        }
        
        setTVShows(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch TV shows');
        console.error('Error fetching TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [category]);

  return { tvShows, loading, error };
};
