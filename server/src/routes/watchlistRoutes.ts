import express from 'express';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkInWatchlist,
} from '../controllers/watchlistController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/:itemId/:itemType', removeFromWatchlist);
router.get('/check/:itemId/:itemType', checkInWatchlist);

export default router;
