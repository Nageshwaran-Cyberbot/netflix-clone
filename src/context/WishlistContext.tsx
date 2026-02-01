/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Movie } from '../types';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import * as watchlistAPI from '../services/api/watchlist.api';

interface WishlistContextType {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
  isInWishlist: (movieId: number) => boolean;
  loading: boolean;
  syncWatchlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Movie[]>(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('netflix-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated } = useAuth();

  // Sync wishlist from backend when user logs in
  const syncWatchlist = async () => {
    if (!token || !isAuthenticated) return;

    try {
      setLoading(true);
      const response = await watchlistAPI.getWatchlist(token);
      
      if (response.success && response.data) {
        // Convert backend format to frontend Movie format
        const movies: Movie[] = response.data.map((item: any) => ({
          id: item.itemId,
          title: item.title,
          poster_path: item.posterPath,
          backdrop_path: item.backdropPath,
          overview: item.overview,
          release_date: item.releaseDate,
          vote_average: item.voteAverage,
          media_type: item.itemType,
        }));
        
        setWishlist(movies);
        localStorage.setItem('netflix-wishlist', JSON.stringify(movies));
      }
    } catch (error) {
      console.error('Error syncing watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sync on mount and when auth changes
  useEffect(() => {
    syncWatchlist();
  }, [token, isAuthenticated]);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('netflix-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = async (movie: Movie) => {
    if (isInWishlist(movie.id)) {
      toast('Already in your list!');
      return;
    }

    // Optimistically update UI
    setWishlist(prev => [...prev, movie]);
    toast.success(`${movie.title} added to My List!`);

    // If authenticated, sync with backend
    if (token && isAuthenticated) {
      try {
        const item: watchlistAPI.WatchlistItem = {
          itemId: movie.id,
          itemType: movie.media_type === 'tv' ? 'tv' : 'movie',
          title: movie.title || movie.name || '',
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          overview: movie.overview,
          releaseDate: movie.release_date || movie.first_air_date,
          voteAverage: movie.vote_average,
        };

        await watchlistAPI.addToWatchlist(token, item);
      } catch (error) {
        console.error('Error adding to backend:', error);
        // Revert on error
        setWishlist(prev => prev.filter(m => m.id !== movie.id));
        toast.error('Failed to sync with server. Try again.');
      }
    }
  };

  const removeFromWishlist = async (movieId: number) => {
    const movie = wishlist.find(m => m.id === movieId);
    
    // Optimistically update UI
    setWishlist(prev => prev.filter(m => m.id !== movieId));
    if (movie) {
      toast.success(`${movie.title} removed from My List!`);
    }

    // If authenticated, sync with backend
    if (token && isAuthenticated && movie) {
      try {
        const itemType = movie.media_type === 'tv' ? 'tv' : 'movie';
        await watchlistAPI.removeFromWatchlist(token, movieId, itemType);
      } catch (error) {
        console.error('Error removing from backend:', error);
        // Revert on error
        if (movie) {
          setWishlist(prev => [...prev, movie]);
        }
        toast.error('Failed to sync with server. Try again.');
      }
    }
  };

  const isInWishlist = (movieId: number) => {
    return wishlist.some(m => m.id === movieId);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist,
        loading,
        syncWatchlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Separate file recommended by React Fast Refresh
// Or use this pattern to export the hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
