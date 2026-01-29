import express from 'express';
import {
  getWatchHistory,
  addToHistory,
  clearHistory,
  deleteHistoryItem,
} from '../controllers/historyController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

router.get('/', getWatchHistory);
router.post('/', addToHistory);
router.delete('/', clearHistory);
router.delete('/:itemId/:itemType', deleteHistoryItem);

export default router;
