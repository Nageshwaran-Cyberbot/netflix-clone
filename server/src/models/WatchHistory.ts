import mongoose, { Schema, Document, Model } from 'mongoose';
import type { IWatchHistory } from '../types/index.js';

interface IWatchHistoryDocument extends Omit<IWatchHistory, '_id'>, Document {}

const watchHistorySchema = new Schema<IWatchHistoryDocument>(
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
    watchedAt: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: false,
  }
);

// Create compound index for efficient queries
watchHistorySchema.index({ userId: 1, watchedAt: -1 });

export const WatchHistory: Model<IWatchHistoryDocument> = mongoose.model<IWatchHistoryDocument>(
  'WatchHistory',
  watchHistorySchema
);
