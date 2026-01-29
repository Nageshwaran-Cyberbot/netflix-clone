import { Request, Response } from 'express';
import { WatchHistory } from '../models/WatchHistory.js';

// @desc    Get user's watch history
// @route   GET /api/history
// @access  Private
export const getWatchHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const limit = parseInt(req.query.limit as string) || 50;

    const history = await WatchHistory.find({ userId })
      .sort({ watchedAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error: any) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching watch history',
      error: error.message,
    });
  }
};

// @desc    Add item to watch history
// @route   POST /api/history
// @access  Private
export const addToHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const { itemId, itemType, title, posterPath, progress } = req.body;

    // Validate required fields
    if (!itemId || !itemType || !title) {
      res.status(400).json({
        success: false,
        message: 'Please provide itemId, itemType, and title',
      });
      return;
    }

    // Check if item already exists, update if it does
    const existingItem = await WatchHistory.findOne({ userId, itemId, itemType });

    if (existingItem) {
      existingItem.watchedAt = new Date();
      existingItem.progress = progress || existingItem.progress;
      await existingItem.save();

      res.status(200).json({
        success: true,
        message: 'Watch history updated',
        data: existingItem,
      });
      return;
    }

    // Create new history item
    const historyItem = await WatchHistory.create({
      userId,
      itemId,
      itemType,
      title,
      posterPath,
      progress: progress || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Item added to watch history',
      data: historyItem,
    });
  } catch (error: any) {
    console.error('Add to history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to watch history',
      error: error.message,
    });
  }
};

// @desc    Clear watch history
// @route   DELETE /api/history
// @access  Private
export const clearHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;

    await WatchHistory.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: 'Watch history cleared',
    });
  } catch (error: any) {
    console.error('Clear history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing watch history',
      error: error.message,
    });
  }
};

// @desc    Delete specific item from history
// @route   DELETE /api/history/:itemId/:itemType
// @access  Private
export const deleteHistoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const { itemId, itemType } = req.params;

    const result = await WatchHistory.findOneAndDelete({
      userId,
      itemId: parseInt(itemId),
      itemType,
    });

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Item not found in history',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from history',
    });
  } catch (error: any) {
    console.error('Delete history item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting from history',
      error: error.message,
    });
  }
};
