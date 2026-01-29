import { Request, Response } from 'express';
import { Watchlist } from '../models/Watchlist.js';

// @desc    Get user's watchlist
// @route   GET /api/watchlist
// @access  Private
export const getWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;

    const watchlist = await Watchlist.find({ userId }).sort({ addedAt: -1 });

    res.status(200).json({
      success: true,
      count: watchlist.length,
      data: watchlist,
    });
  } catch (error: any) {
    console.error('Get watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching watchlist',
      error: error.message,
    });
  }
};

// @desc    Add item to watchlist
// @route   POST /api/watchlist
// @access  Private
export const addToWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const {
      itemId,
      itemType,
      title,
      posterPath,
      backdropPath,
      overview,
      releaseDate,
      voteAverage,
    } = req.body;

    // Validate required fields
    if (!itemId || !itemType || !title) {
      res.status(400).json({
        success: false,
        message: 'Please provide itemId, itemType, and title',
      });
      return;
    }

    // Check if item already exists
    const existingItem = await Watchlist.findOne({ userId, itemId, itemType });
    if (existingItem) {
      res.status(400).json({
        success: false,
        message: 'Item already in watchlist',
      });
      return;
    }

    // Create watchlist item
    const watchlistItem = await Watchlist.create({
      userId,
      itemId,
      itemType,
      title,
      posterPath,
      backdropPath,
      overview,
      releaseDate,
      voteAverage,
    });

    res.status(201).json({
      success: true,
      message: 'Item added to watchlist',
      data: watchlistItem,
    });
  } catch (error: any) {
    console.error('Add to watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to watchlist',
      error: error.message,
    });
  }
};

// @desc    Remove item from watchlist
// @route   DELETE /api/watchlist/:itemId/:itemType
// @access  Private
export const removeFromWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const { itemId, itemType } = req.params;

    const result = await Watchlist.findOneAndDelete({
      userId,
      itemId: parseInt(itemId),
      itemType,
    });

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Item not found in watchlist',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from watchlist',
    });
  } catch (error: any) {
    console.error('Remove from watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing from watchlist',
      error: error.message,
    });
  }
};

// @desc    Check if item is in watchlist
// @route   GET /api/watchlist/check/:itemId/:itemType
// @access  Private
export const checkInWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const { itemId, itemType } = req.params;

    const item = await Watchlist.findOne({
      userId,
      itemId: parseInt(itemId),
      itemType,
    });

    res.status(200).json({
      success: true,
      data: {
        inWatchlist: !!item,
      },
    });
  } catch (error: any) {
    console.error('Check watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking watchlist',
      error: error.message,
    });
  }
};
