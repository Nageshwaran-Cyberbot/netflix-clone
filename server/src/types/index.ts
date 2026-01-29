// Type definitions for the backend

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IWatchlistItem {
  _id: string;
  userId: string;
  itemId: number;
  itemType: 'movie' | 'tv';
  title: string;
  posterPath?: string;
  backdropPath?: string;
  overview?: string;
  releaseDate?: string;
  voteAverage?: number;
  addedAt: Date;
}

export interface IWatchHistory {
  _id: string;
  userId: string;
  itemId: number;
  itemType: 'movie' | 'tv';
  title: string;
  posterPath?: string;
  watchedAt: Date;
  progress?: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}
