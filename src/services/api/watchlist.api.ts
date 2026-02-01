// Update the base URL for backend API
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001/api';

export interface WatchlistItem {
  itemId: number;
  itemType: 'movie' | 'tv';
  title: string;
  posterPath?: string;
  backdropPath?: string;
  overview?: string;
  releaseDate?: string;
  voteAverage?: number;
}

interface WatchlistResponse {
  success: boolean;
  message?: string;
  data?: any;
  count?: number;
}

// Get user's watchlist
export const getWatchlist = async (token: string): Promise<WatchlistResponse> => {
  const response = await fetch(`${BACKEND_URL}/watchlist`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

// Add item to watchlist
export const addToWatchlist = async (
  token: string,
  item: WatchlistItem
): Promise<WatchlistResponse> => {
  const response = await fetch(`${BACKEND_URL}/watchlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

// Remove item from watchlist
export const removeFromWatchlist = async (
  token: string,
  itemId: number,
  itemType: 'movie' | 'tv'
): Promise<WatchlistResponse> => {
  const response = await fetch(`${BACKEND_URL}/watchlist/${itemId}/${itemType}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

// Check if item is in watchlist
export const checkInWatchlist = async (
  token: string,
  itemId: number,
  itemType: 'movie' | 'tv'
): Promise<WatchlistResponse> => {
  const response = await fetch(`${BACKEND_URL}/watchlist/check/${itemId}/${itemType}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export default {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkInWatchlist,
};
