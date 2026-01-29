import mongoose, { Schema, Document, Model } from 'mongoose';
import type { IWatchlistItem } from '../types/index.js';

interface IWatchlistDocument extends Omit<IWatchlistItem, '_id'>, Document {}

const watchlistSchema = new Schema<IWatchlistDocument>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    itemId: {
      type: Number,
      required: true,
    },
    itemType: {
      type: String,
      enum: ['movie', 'tv'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
      default: null,
    },
    backdropPath: {
      type: String,
      default: null,
    },
    overview: {
      type: String,
      default: null,
    },
    releaseDate: {
      type: String,
      default: null,
    },
    voteAverage: {
      type: Number,
      default: 0,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Create compound index for userId and itemId to prevent duplicates
watchlistSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

export const Watchlist: Model<IWatchlistDocument> = mongoose.model<IWatchlistDocument>(
  'Watchlist',
  watchlistSchema
);
